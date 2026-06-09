// tests/api/comments.test.js — замени полностью
import { test, expect } from "../../src/helpers/fixtures/api.fixture.js";
import { CommentBuilder } from "../../src/helpers/builders/index.js";
import { faker } from "@faker-js/faker";

test("Creates comment for post", async ({ api }) => {
  const comment = new CommentBuilder()
    .withName(faker.person.fullName())
    .withEmail(faker.internet.email())
    .withBody(faker.lorem.paragraph())
    .build();

  const postId = 1;

  const res = await api.comments.create(postId, comment);
  const body = await res.json();

  expect(res.status()).toBe(201);
  expect(body).toHaveProperty("name", comment.name);
  expect(body).toHaveProperty("email", comment.email);
  expect(body).toHaveProperty("body", comment.body);
  expect(body).toHaveProperty("postId", postId.toString()); // ✅ строка "1"
  expect(body).toHaveProperty("id");
});

test("Gets comments by post", async ({ api }) => {
  const postId = 1;

  const res = await api.comments.getByPost(postId);
  const body = await res.json();

  expect(res.status()).toBe(200);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  //  ИСПРАВЛЕНО: сравниваем со строкой
  body.forEach((comment) => {
    expect(String(comment.postId)).toBe(String(postId));
  });
});
