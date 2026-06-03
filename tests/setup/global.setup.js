import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const dbPath = path.join(root, 'db.json');

let server;

export default async function globalSetup() {
  // Запускаем json-server
  server = spawn('npx', ['json-server', '--watch', dbPath, '--port', '3000', '--host', 'localhost'], {
    cwd: root,
    stdio: 'pipe',
    shell: true,
  });

  // Ждём готовности сервера
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('json-server did not start in 10s')), 10000);
    server.stdout.on('data', (data) => {
      if (data.toString().includes('Routes')) {
        clearTimeout(timeout);
        resolve();
      }
    });
    server.stderr.on('data', (data) => {
      console.error(`json-server error: ${data}`);
    });
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
    API_BASE_URL: 'http://localhost:3000',
    BROWSER: 'chromium',
    NODE: process.version,
    PLATFORM: process.platform,
    CI: process.env.CI ? 'true' : 'false',
  };

  fs.writeFileSync(
    path.join(resultsDir, 'environment.properties'),
    Object.entries(env).map(([k, v]) => `${k}=${v}`).join('\n'),
    'utf-8'
  );
}

export async function globalTeardown() {
  if (server) {
    server.kill();
  }
}