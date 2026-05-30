import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';

export class PostsService {
  constructor(api) {
    this.api = api;
  }

  async getAll() {
    return await this.api.get('/posts');
  }

  async getById(id) {
    return await this.api.get(`/posts/${id}`);
  }

  async create(data) {
    return await this.api.post('/posts', data);
  }

  async update(id, data) {
    return await this.api.put(`/posts/${id}`, data);
  }

  async patch(id, data) {
    return await this.api.patch(`/posts/${id}`, data);
  }

  async delete(id) {
    return await this.api.delete(`/posts/${id}`);
  }

  async expectStatus(res, expected) {
    await allure.step(`Expect status ${expected}`, async () => {
      expect(res.status()).toBe(expected);
    });
  }

  async expectJsonArray(res) {
    await allure.step('Expect JSON array', async () => {
      const body = await res.json();
      expect(Array.isArray(body)).toBe(true);
    });
  }

  async expectPostCreated(res, expectedTitle) {
    await allure.step('Expect post created', async () => {
      const body = await res.json();
      expect(body).toHaveProperty('title', expectedTitle);
      expect(body).toHaveProperty('id');
    });
  }

  async expectPostUpdated(res, expectedTitle) {
    await allure.step('Expect post updated', async () => {
      const body = await res.json();
      expect(body.title).toBe(expectedTitle);
    });
  }
}
