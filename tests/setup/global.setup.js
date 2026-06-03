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

const seedData = {
  posts: [
    { id: 1, title: 'Hello World', body: 'This is my first post', userId: 1 },
    { id: 2, title: 'Second Post', body: 'Another post content', userId: 1 },
    { id: 3, title: 'Third Post', body: 'More content here', userId: 2 }
  ],
  comments: [
    { id: 1, postId: 1, name: 'John Doe', email: 'john@example.com', body: 'Great post!' },
    { id: 2, postId: 1, name: 'Jane Smith', email: 'jane@example.com', body: 'Thanks for sharing' },
    { id: 3, postId: 2, name: 'Bob Wilson', email: 'bob@example.com', body: 'Interesting read' }
  ],
  profile: { name: 'ilyared89' }
};

export default async function globalSetup() {
  usedPort = await getFreePort();
  const apiUrl = `http://localhost:${usedPort}`;
  process.env.API_BASE_URL = apiUrl;
  console.log(`Using free port: ${usedPort}`);

  // ✅ Создаём db.json с seed-данными, если его нет
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(seedData, null, 2));
  }

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

  // Allure environment
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