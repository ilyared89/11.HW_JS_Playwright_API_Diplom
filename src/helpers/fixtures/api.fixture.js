import { test as base, expect } from "@playwright/test";
import { ApiService, PostsService, CommentsService } from "../../services/index.js";

export const apiTest = base.extend({
  api: async ({ playwright }, use) => {
    const baseURL = process.env.API_BASE_URL || "http://localhost:3000";
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