import { test as base } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Api } from '../../facades/api.facade.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../..');
const statePath = path.join(root, '.api-state.json');

function getApiBaseUrl() {
  // 1. Проверяем env (устанавливается globalSetup)
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL;
  }
  
  // 2. Читаем из файла (backup)
  if (fs.existsSync(statePath)) {
    try {
      const state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
      return state.apiUrl;
    } catch (e) {
      console.warn('[api.fixture] Failed to read state file:', e.message);
    }
  }
  
  // 3. Fallback
  console.warn('[api.fixture] Using fallback localhost:3000');
  return 'http://localhost:3000';
}

export const test = base.extend({
  api: async ({ request }, use) => {
    const apiUrl = getApiBaseUrl();
    console.log('[api.fixture] API_BASE_URL:', apiUrl);
    
    // Устанавливаем для сервисов
    process.env.API_BASE_URL = apiUrl;
    
    await use(new Api(request));
  },
});

export { expect } from '@playwright/test';