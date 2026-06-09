import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/api.fixture.js";

test("Gets a single post", async ({ api }) => {
  const res = await api.posts.getById(1);
  const body = await res.json();

  expect(res.status()).toBe(200);
  expect(body).toHaveProperty("id", 1);
  expect(body).toHaveProperty("title");
  expect(body).toHaveProperty("body");
  expect(body).toHaveProperty("userId");
});

test("Gets all posts", async ({ api }) => {
  const res = await api.posts.getAll();
  const body = await res.json();

  expect(res.status()).toBe(200);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});
