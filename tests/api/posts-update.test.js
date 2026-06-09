import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/api.fixture.js";
import { PostBuilder } from "../../src/helpers/builders/index.js";
import { faker } from "@faker-js/faker";

test("Updates post with PUT", async ({ api }) => {
  // Создаём пост для изоляции
  const post = new PostBuilder().addTitle().addBody().addUserId().build();
  const createRes = await api.posts.create(post);
  const createdId = (await createRes.json()).id;

  const update = new PostBuilder()
    .withTitle(faker.lorem.words(3))
    .withBody(faker.lorem.paragraph())
    .withUserId(post.userId)
    .build();

  const res = await api.posts.update(createdId, update);
  const body = await res.json();

  expect(res.status()).toBe(200);
  expect(body).toHaveProperty("title", update.title);
  expect(body).toHaveProperty("body", update.body);
  expect(body).toHaveProperty("userId", update.userId);
  expect(body).toHaveProperty("id", createdId);
});

test("Partially updates post with PATCH", async ({ api }) => {
  // Создаём пост для изоляции
  const post = new PostBuilder().addTitle().addBody().addUserId().build();
  const createRes = await api.posts.create(post);
  const createdId = (await createRes.json()).id;

  const patchPayload = new PostBuilder()
    .withTitle(faker.lorem.words(3))
    .build();

  const res = await api.posts.patch(createdId, patchPayload);
  const body = await res.json();

  expect(res.status()).toBe(200);
  expect(body).toHaveProperty("title", patchPayload.title);
  expect(body).toHaveProperty("id", createdId);
});
