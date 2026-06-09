import { test as base } from '@playwright/test';
import { App } from '../../facades/app.facade.js';

export const test = base.extend({
  app: async ({ page }, use) => {
    await use(new App(page));
  },
});

export { expect } from '@playwright/test';