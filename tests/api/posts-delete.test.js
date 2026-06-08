import { allure } from "allure-playwright";
import {
  apiTest as test,
  expect,
} from "../../src/helpers/fixtures/api.fixture.js";
import { PostBuilder } from "../../src/helpers/builders/index.js";

test.describe("API · Posts Delete @API @POSTS", () => {
  test("Creates and deletes post successfully @SMOKE @DELETE", async ({
    api,
  }) => {
    await allure.epic("json-server");
    await allure.feature("Posts");
    await allure.story("Delete post");
    await allure.severity("critical");

    const post = new PostBuilder().addTitle().addBody().addUserId().build();
    const createRes = await api.posts.create(post);
    expect(createRes.status()).toBe(201);
    const created = await createRes.json();
    const postId = created.id;

    const deleteRes = await api.posts.delete(postId);
    expect(deleteRes.status()).toBe(200);

    const getRes = await api.posts.getById(postId);
    expect(getRes.status()).toBe(404);
  });
});
