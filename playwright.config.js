// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  globalSetup: './tests/setup/global.setup.js',

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 
  [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['allure-playwright', {
      detail: true,
      suiteTitle: true,
      environmentInfo: {
        browser: 'chromium',
        project: 'Diploma_Automation'
      }
    }]
  ],
  use: 
  {
    baseURL: 'https://bstackdemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    extraHTTPHeaders: { 'Accept': 'application/json' },
  },
  
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  
});

