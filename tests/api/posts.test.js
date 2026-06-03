import { allure } from "allure-playwright";
import {
  apiTest as test,
  expect,
} from "../../src/helpers/fixtures/api.fixture.js";
import { newPost } from "../../src/helpers/builders/index.js";

test.describe("API · Posts @API @POSTS", () => {
  test("Creates a new post @SMOKE @POST", async ({ postsApi }) => {
    await allure.epic("json-server");
    await allure.feature("Posts");
    await allure.story("Create post");
    await allure.severity("blocker");

    const post = newPost();
    const res = await postsApi.create(post);

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toHaveProperty("title", post.title);
    expect(body).toHaveProperty("id");
  });
});
