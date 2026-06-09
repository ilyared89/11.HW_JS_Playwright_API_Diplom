// src/facades/api.facade.js
import { PostsService } from "../services/posts.service.js";
import { CommentsService } from "../services/comments.service.js";

export class Api {
  constructor(request) {
    this.posts = new PostsService(request);
    this.comments = new CommentsService(request);
  }
}
