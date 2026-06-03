import { allure } from "allure-playwright";
import {
  apiTest as test,
  expect,
} from "../../src/helpers/fixtures/api.fixture.js";
import { newPost } from "../../src/helpers/builders/index.js";

test.describe("API · Posts Delete @API @POSTS", () => {
  test("Creates and deletes post successfully @SMOKE @DELETE", async ({
    postsApi,
  }) => {
    await allure.epic("json-server");
    await allure.feature("Posts");
    await allure.story("Delete post");
    await allure.severity("critical");

    // 1. Создаём пост
    const post = newPost();
    const createRes = await postsApi.create(post);
    expect(createRes.status()).toBe(201);
    const created = await createRes.json();
    const postId = created.id;

    // 2. Удаляем по полученному id
    const deleteRes = await postsApi.delete(postId);
    expect(deleteRes.status()).toBe(200);

    // 3. Проверяем, что пост удалён (404)
    const getRes = await postsApi.getById(postId);
    expect(getRes.status()).toBe(404);
  });
});
