import { allure } from "allure-playwright";
import {
  apiTest as test,
  expect,
} from "../../src/helpers/fixtures/api.fixture.js";

test.describe("API · Posts Get @API @POSTS", () => {
  test("Gets all posts @SMOKE @GET", async ({ postsApi }) => {
    await allure.epic("json-server");
    await allure.feature("Posts");
    await allure.story("Get all posts");
    await allure.severity("critical");

    const res = await postsApi.getAll();
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test("Gets a single post @GET", async ({ postsApi }) => {
    const res = await postsApi.getById(1);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(body.title).toBeDefined();
    expect(body.body).toBeDefined();     
     expect(body.userId).toBeDefined();
  });
});
