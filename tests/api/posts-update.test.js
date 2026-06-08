import { allure } from "allure-playwright";
import {
  apiTest as test,
  expect,
} from "../../src/helpers/fixtures/api.fixture.js";
import { PostBuilder } from "../../src/helpers/builders/index.js";

test.describe("API · Posts Update @API @POSTS", () => {
  test("Updates post with PUT @SMOKE @PUT", async ({ api }) => {
    await allure.epic("json-server");
    await allure.feature("Posts");
    await allure.story("Update post");
    await allure.severity("critical");

    const post = new PostBuilder().addTitle().addBody().addUserId().build();
    const createRes = await api.posts.create(post);
    expect(createRes.status()).toBe(201);
    const created = await createRes.json();
    const postId = created.id;

    const update = new PostBuilder().addTitle().addBody().addUserId().build();
    const res = await api.posts.update(postId, update);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe(update.title);
    expect(body.body).toBe(update.body);
    expect(body.userId).toBe(update.userId);
  });

  test("Partially updates post with PATCH @PATCH", async ({ api }) => {
    await allure.epic("json-server");
    await allure.feature("Posts");
    await allure.story("Partial update post");
    await allure.severity("normal");

    const post = new PostBuilder().addTitle().addBody().addUserId().build();
    const createRes = await api.posts.create(post);
    expect(createRes.status()).toBe(201);
    const created = await createRes.json();
    const postId = created.id;

    const patch = new PostBuilder().addTitle().build();
    const res = await api.posts.patch(postId, { title: patch.title });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe(patch.title);
  });
});
