import { allure } from 'allure-playwright';

export class PostsService {
  constructor(request) {
    this.request = request;
    this.baseUrl = process.env.API_BASE_URL;  // должен быть установлен
  }
  
 async create(data) {
  const url = `${this.baseUrl}/posts`;
  console.log('🔍 POST URL:', url);
  return this.request.post(url, { data });
}
  
  async getById(id) {
    return this.request.get(`${this.baseUrl}/posts/${id}`);
  }
  
  async getAll() {
    return this.request.get(`${this.baseUrl}/posts`);
  }
  
  async update(id, data) {
    return this.request.put(`${this.baseUrl}/posts/${id}`, { data });
  }
  
  async patch(id, data) {
    return this.request.patch(`${this.baseUrl}/posts/${id}`, { data });
  }
  
  async delete(id) {
    return this.request.delete(`${this.baseUrl}/posts/${id}`);
  }
}