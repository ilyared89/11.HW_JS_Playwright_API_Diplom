import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers:  1,
  timeout: 90_000,
  expect: { timeout: 10_000 },
  globalSetup: './tests/setup/global.setup.js',
  globalTeardown: './tests/setup/global.teardown.js',

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      environmentInfo: {
        framework: 'Playwright',
        language: 'JavaScript',
        os: process.platform,
        node: process.version,
      },
    }]
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://demowebshop.tricentis.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 20_000,
    navigationTimeout: 60_000,
    launchOptions: {
      args: ['--disable-http2']
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
