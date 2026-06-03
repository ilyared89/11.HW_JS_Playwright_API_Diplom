import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { createServer } from 'node:net';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const dbPath = path.join(root, 'db.json');

const require = createRequire(import.meta.url);
const jsonServer = require('json-server');

let serverInstance;
let usedPort;

// Получаем случайный свободный порт
function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.listen(0, 'localhost', () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

export default async function globalSetup() {
  // 1. Получаем свободный порт
  usedPort = await getFreePort();
  const apiUrl = `http://localhost:${usedPort}`;
  process.env.API_BASE_URL = apiUrl; // ← фикстуры подхватят автоматически
  console.log(`Using free port: ${usedPort}`);

  // 2. Создаём db.json если нет
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ posts: [], comments: [] }, null, 2));
  }

  // 3. Запускаем json-server на случайном порту
  const server = jsonServer.create();
  const router = jsonServer.router(dbPath);
  const middlewares = jsonServer.defaults({ logger: false });

  server.use(middlewares);
  server.use(router);

  await new Promise((resolve, reject) => {
    serverInstance = server.listen(usedPort, 'localhost', (err) => {
      if (err) return reject(err);
      console.log(`json-server started at ${apiUrl}`);
      resolve();
    });
    serverInstance.on('error', reject);
  });

  // 4. Allure environment
  const resultsDir = path.join(root, 'allure-results');
  fs.mkdirSync(resultsDir, { recursive: true });

  const categoriesSrc = path.join(root, 'allure', 'categories.json');
  if (fs.existsSync(categoriesSrc)) {
    fs.copyFileSync(categoriesSrc, path.join(resultsDir, 'categories.json'));
  }

  const env = {
    BASE_URL: process.env.BASE_URL || 'https://demowebshop.tricentis.com',
    API_BASE_URL: apiUrl,
    BROWSER: 'chromium',
    NODE: process.version,
    PLATFORM: process.platform,
    CI: process.env.CI ? 'true' : 'false',
    BRANCH: process.env.GITHUB_REF_NAME || 'local',
    COMMIT: (process.env.GITHUB_SHA || '').slice(0, 7) || 'local',
    BUILD: process.env.GITHUB_RUN_NUMBER || 'local',
  };

  fs.writeFileSync(
    path.join(resultsDir, 'environment.properties'),
    Object.entries(env).map(([k, v]) => `${k}=${v}`).join('\n'),
    'utf-8'
  );
}

export async function globalTeardown() {
  if (serverInstance) {
    await new Promise((resolve) => {
      serverInstance.close(() => {
        console.log('json-server stopped');
        resolve();
      });
    });
  }
}