import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';

export class CommentsService {
  constructor(api) {
    this.api = api;
  }

  async getByPost(postId) {
    return await this.api.get(`/posts/${postId}/comments`);
  }

  async create(postId, data) {
    return await this.api.post(`/posts/${postId}/comments`, data);
  }

  async expectCommentsFound(res) {
    await allure.step('Expect comments found', async () => {
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
    });
  }

  async expectCommentCreated(res, expectedData) {
    await allure.step('Expect comment created', async () => {
      expect(res.status()).toBe(201);
      const body = await res.json();
      expect(body.name).toBe(expectedData.name);
      expect(body.email).toBe(expectedData.email);
      expect(body.body).toBe(expectedData.body);
      expect(body.id).toBeDefined();
    });
  }
}
