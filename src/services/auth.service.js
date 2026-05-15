// @ts-check
import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';

export class AuthService {
  constructor(api) {
    this.api = api;
  }

  async register(email, password) {
    return await this.api.post('/api/register', { email, password });
  }

  async login(email, password) {
    return await this.api.post('/api/login', { email, password });
  }

  async expectRegisterSuccess(res) {
    await allure.step('Expect register success', async () => {
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.id).toBeDefined();
      expect(body.token).toBeDefined();
    });
  }

  async expectRegisterError(res, expectedError) {
    await allure.step('Expect register error', async () => {
      expect(res.status()).toBe(400);
      const body = await res.json();
      expect(body.error).toBe(expectedError);
    });
  }

  async expectLoginSuccess(res) {
    await allure.step('Expect login success', async () => {
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.token).toBeDefined();
    });
  }

  async expectLoginError(res, expectedError) {
    await allure.step('Expect login error', async () => {
      expect(res.status()).toBe(400);
      const body = await res.json();
      expect(body.error).toBe(expectedError);
    });
  }
}
