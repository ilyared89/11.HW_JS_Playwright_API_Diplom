import { allure } from "allure-playwright";
import {
  apiTest as test,
  expect,
} from "../../src/helpers/fixtures/api.fixture.js";

test.describe("API · Posts Get @API @POSTS", () => {
  test("Gets all posts @SMOKE @GET", async ({ api }) => {
    await allure.epic("json-server");
    await allure.feature("Posts");
    await allure.story("Get all posts");
    await allure.severity("critical");

    const res = await api.posts.getAll();
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test("Gets a single post @GET", async ({ api }) => {
    const res = await api.posts.getById(1);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(body.title).toBeDefined();
    expect(body.body).toBeDefined();
    expect(body.userId).toBeDefined();
  });
});
