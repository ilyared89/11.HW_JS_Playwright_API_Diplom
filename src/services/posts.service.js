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
}