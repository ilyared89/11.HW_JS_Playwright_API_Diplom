import { allure } from 'allure-playwright';
import { apiTest as test, expect } from '../../src/helpers/fixtures/api.fixture.js';
import { newPost } from '../../src/helpers/builders/post.builder.js';

test.describe('API · Posts Update @API @POSTS', () => {
  test('Updates post with PUT @SMOKE @PUT', async ({ postsApi }) => {
    const post = newPost();
    const res = await postsApi.update(1, post);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe(post.title);
  });

  test('Partially updates post with PATCH @PATCH', async ({ postsApi }) => {
    const post = newPost(); // используем Builder
    const res = await postsApi.patch(1, { title: post.title });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe(post.title);
  });
});