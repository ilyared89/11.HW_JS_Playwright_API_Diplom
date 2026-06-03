import { allure } from 'allure-playwright';
import { apiTest as test, expect } from '../../src/helpers/fixtures/api.fixture.js';
import { newPost } from '../../src/helpers/builders/index.js';

test.describe('API · Posts Update @API @POSTS', () => {
  test('Updates post with PUT @SMOKE @PUT', async ({ postsApi }) => {
    await allure.epic('json-server');
    await allure.feature('Posts');
    await allure.story('Update post');
    await allure.severity('critical');

    // 1. Создаём пост
    const post = newPost();
    const createRes = await postsApi.create(post);
    expect(createRes.status()).toBe(201);
    const created = await createRes.json();
    const postId = created.id;

    // 2. Обновляем его
    const update = newPost();
    const res = await postsApi.update(postId, update);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe(update.title);
  });

  test('Partially updates post with PATCH @PATCH', async ({ postsApi }) => {
    await allure.epic('json-server');
    await allure.feature('Posts');
    await allure.story('Partial update post');
    await allure.severity('normal');

    // 1. Создаём пост
    const post = newPost();
    const createRes = await postsApi.create(post);
    expect(createRes.status()).toBe(201);
    const created = await createRes.json();
    const postId = created.id;

    // 2. PATCH
    const patch = newPost();
    const res = await postsApi.patch(postId, { title: patch.title });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe(patch.title);
  });
});