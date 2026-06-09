import { allure } from 'allure-playwright';

export class CommentsService {
  constructor(request) {
    this.request = request;
    this.baseUrl = process.env.API_BASE_URL;
  }
  
  async create(postId, data) {
    return this.request.post(`${this.baseUrl}/posts/${postId}/comments`, { data });
  }
  
  async getByPost(postId) {
    return this.request.get(`${this.baseUrl}/posts/${postId}/comments`);
  }
}