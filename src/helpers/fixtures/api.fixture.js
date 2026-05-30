import { test as base, expect } from "@playwright/test";
import { ApiService } from "../../services/api.service.js";
import { PostsService } from "../../services/posts.service.js";
import { CommentsService } from "../../services/comments.service.js";

export const apiTest = base.extend({
  api: async ({ playwright }, use) => {
    const baseURL =
      process.env.API_BASE_URL ||
      "https://my-json-server.typicode.com/ilyared89/demo";
    const ctx = await playwright.request.newContext({ baseURL });
    await use(new ApiService(ctx, baseURL));
    await ctx.dispose();
  },
  postsApi: async ({ api }, use) => {
    await use(new PostsService(api));
  },
  commentsApi: async ({ api }, use) => {
    await use(new CommentsService(api));
  },
});

export { expect };
