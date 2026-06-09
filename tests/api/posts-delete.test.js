import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/api.fixture.js";
import { PostBuilder } from "../../src/helpers/builders/index.js";

test("Deletes post successfully", async ({ api }) => {
  // Создаём пост для изоляции
  const post = new PostBuilder().addTitle().addBody().addUserId().build();
  const createRes = await api.posts.create(post);
  const createdId = (await createRes.json()).id;

  // Удаляем созданный пост
  const deleteRes = await api.posts.delete(createdId);
  expect(deleteRes.status()).toBe(200);

  // Проверяем, что пост действительно удалён
  const getRes = await api.posts.getById(createdId);
  expect(getRes.status()).toBe(404);
});
