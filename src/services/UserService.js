import { request } from '@playwright/test';

export class UserService {
  constructor(apiContext) {
    this.apiContext = apiContext;
    this.basePath = '/api/users';
  }

  async createUser(userData) {
    return await this.apiContext.post(this.basePath, {
      data: userData,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async getUser(userId) {
    return await this.apiContext.get(`${this.basePath}/${userId}`);
  }

  async assertUserCreated(response, expectedData) {
    const body = await response.json();
    if (body.name !== expectedData.name) {
      throw new Error(`Expected name ${expectedData.name}, got ${body.name}`);
    }
    return body;
  }
}