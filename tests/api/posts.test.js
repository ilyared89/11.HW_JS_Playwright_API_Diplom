import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/api.fixture.js";
import { PostBuilder } from "../../src/helpers/builders/index.js";
import { faker } from "@faker-js/faker";

test("Creates a new post", async ({ api }) => {
  const post = new PostBuilder()
    .withTitle(faker.lorem.words(3))
    .withBody(faker.lorem.paragraph())
    .withUserId(faker.number.int({ min: 1, max: 10 }))
    .build();

  const res = await api.posts.create(post);
  const body = await res.json();

  expect(res.status()).toBe(201);
  expect(body).toHaveProperty("title", post.title);
  expect(body).toHaveProperty("body", post.body);
  expect(body).toHaveProperty("userId", post.userId);
  expect(body).toHaveProperty("id");
});
