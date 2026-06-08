import { allure } from "allure-playwright";
import {
  apiTest as test,
  expect,
} from "../../src/helpers/fixtures/api.fixture.js";
import { PostBuilder } from '../../src/helpers/builders/index.js';

test.describe("API · Posts @API @POSTS", () => {
test('Creates a new post @SMOKE @POST', async ({ api }) => {
  const post = new PostBuilder().addTitle().addBody().addUserId().build();
  const res = await api.posts.create(post);
  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body.title).toBe(post.title);
  expect(body.body).toBe(post.body);
  expect(body.userId).toBe(post.userId);
  expect(body.id).toBeDefined();
});
});
