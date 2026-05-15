// @ts-check
import { test as base, expect } from '@playwright/test';
import { ApiService } from '../../services/api.service.js';
import { UserService } from '../../services/user.service.js';
import { AuthService } from '../../services/auth.service.js';

export const apiTest = base.extend({
  api: async ({ playwright }, use) => {
    const baseURL = process.env.API_BASE_URL || 'https://reqres.in';
    const ctx = await playwright.request.newContext({ baseURL });
    await use(new ApiService(ctx, baseURL));
    await ctx.dispose();
  },
  userApi: async ({ api }, use) => {
    await use(new UserService(api));
  },
  authApi: async ({ api }, use) => {
    await use(new AuthService(api));
  },
});

export { expect };
