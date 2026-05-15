// @ts-check
import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';

export class UserService {
  constructor(api) {
    this.api = api;
  }

  async createUser(userData) {
    return await this.api.post('/api/users', userData);
  }

  async getUser(userId) {
    return await this.api.get(`/api/users/${userId}`);
  }

  async updateUser(userId, userData) {
    return await this.api.put(`/api/users/${userId}`, userData);
  }

  async patchUser(userId, userData) {
    return await this.api.patch(`/api/users/${userId}`, userData);
  }

  async deleteUser(userId) {
    return await this.api.delete(`/api/users/${userId}`);
  }

  async expectUserCreated(res, expectedData) {
    await allure.step('Expect user created correctly', async () => {
      expect(res.status()).toBe(201);
      const body = await res.json();
      expect(body.name).toBe(expectedData.name);
      expect(body.job).toBe(expectedData.job);
      expect(body.id).toBeDefined();
      expect(body.createdAt).toBeDefined();
    });
  }

  async expectUserFound(res, expectedId) {
    await allure.step(`Expect user ${expectedId} found`, async () => {
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.data.id).toBe(expectedId);
    });
  }

  async expectUserUpdated(res, expectedData) {
    await allure.step('Expect user updated correctly', async () => {
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.name).toBe(expectedData.name);
      expect(body.job).toBe(expectedData.job);
      expect(body.updatedAt).toBeDefined();
    });
  }

  async expectUserDeleted(res) {
    await allure.step('Expect user deleted', async () => {
      expect(res.status()).toBe(204);
    });
  }
}
