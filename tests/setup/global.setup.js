import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

export default async function globalSetup() {
  const resultsDir = path.join(root, 'allure-results');
  fs.mkdirSync(resultsDir, { recursive: true });

  const categoriesSrc = path.join(root, 'allure', 'categories.json');
  if (fs.existsSync(categoriesSrc)) {
    fs.copyFileSync(categoriesSrc, path.join(resultsDir, 'categories.json'));
  }

  const env = {
    BASE_URL: process.env.BASE_URL || 'https://demowebshop.tricentis.com',
    API_URL: process.env.API_BASE_URL || 'https://my-json-server.typicode.com/ilyared89/demo',
    BROWSER: 'chromium',
    NODE: process.version,
    PLATFORM: process.platform,
    CI: process.env.CI ? 'true' : 'false',
    BRANCH: process.env.GITHUB_REF_NAME || 'local',
    COMMIT: (process.env.GITHUB_SHA || '').slice(0, 7) || 'local',
    BUILD: process.env.GITHUB_RUN_NUMBER || 'local',
  };

  const envBody = Object.entries(env)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');

  fs.writeFileSync(path.join(resultsDir, 'environment.properties'), envBody, 'utf-8');
}
