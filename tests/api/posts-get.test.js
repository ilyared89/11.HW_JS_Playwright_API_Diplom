import { allure } from 'allure-playwright';
import { apiTest as test, expect } from '../../src/helpers/fixtures/api.fixture.js';

test.describe('API · Posts Get @API @POSTS', () => {
  test('Gets all posts @SMOKE @GET', async ({ postsApi }) => {
    await allure.epic('json-server');
    await allure.feature('Posts');
    await allure.story('Get all posts');
    await allure.severity('critical');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const res = await postsApi.getAll();
    await postsApi.expectStatus(res, 200);
    await postsApi.expectJsonArray(res);
  });

  test('Gets a single post @GET', async ({ postsApi }) => {
    await allure.epic('json-server');
    await allure.feature('Posts');
    await allure.story('Get single post');
    await allure.severity('normal');
    await allure.owner('ilyared89');

    const res = await postsApi.getById(1);
    await postsApi.expectStatus(res, 200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(body.title).toBeDefined();
  });
});
