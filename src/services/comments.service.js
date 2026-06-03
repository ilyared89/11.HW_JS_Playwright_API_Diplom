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
}