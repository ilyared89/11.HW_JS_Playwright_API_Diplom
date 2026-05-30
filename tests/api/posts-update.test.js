import { allure } from 'allure-playwright';
import { apiTest as test, expect } from '../../src/helpers/fixtures/api.fixture.js';
import { newPost } from '../../src/helpers/builders/post.builder.js';

test.describe('API · Posts Update @API @POSTS', () => {
  test('Updates post with PUT @SMOKE @PUT', async ({ postsApi }) => {
    await allure.epic('json-server');
    await allure.feature('Posts');
    await allure.story('Update post');
    await allure.severity('critical');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const post = newPost();
    const res = await postsApi.update(1, post);
    await postsApi.expectStatus(res, 200);
    await postsApi.expectPostUpdated(res, post.title);
  });

  test('Partially updates post with PATCH @PATCH', async ({ postsApi }) => {
    await allure.epic('json-server');
    await allure.feature('Posts');
    await allure.story('Partial update post');
    await allure.severity('normal');
    await allure.owner('ilyared89');

    const payload = { title: 'Updated Title' };
    const res = await postsApi.patch(1, payload);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe(payload.title);
  });
});
