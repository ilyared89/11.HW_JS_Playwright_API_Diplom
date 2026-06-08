import { test as base, expect } from "@playwright/test";
import { ApiService, PostsService, CommentsService } from "../../services/index.js";

class Api {
  constructor(request, baseURL) {
    this.api = new ApiService(request, baseURL);
    this.posts = new PostsService(this.api);
    this.comments = new CommentsService(this.api);
  }
}

export const apiTest = base.extend({
  api: async ({ playwright }, use) => {
    const baseURL = process.env.API_BASE_URL || "http://localhost:3000";
    const ctx = await playwright.request.newContext({ baseURL });
    const apiFacade = new Api(ctx, baseURL);
    await use(apiFacade);
    await ctx.dispose();
  },
});

export { expect };