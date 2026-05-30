import { allure } from 'allure-playwright';
import { apiTest as test } from '../../src/helpers/fixtures/api.fixture.js';
import { newPost } from '../../src/helpers/builders/post.builder.js';

test.describe('API · Posts @API @POSTS', () => {
  test('Creates a new post @SMOKE @POST', async ({ postsApi }) => {
    await allure.epic('json-server');
    await allure.feature('Posts');
    await allure.story('Create post');
    await allure.severity('blocker');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const post = newPost();
    const res = await postsApi.create(post);
    await postsApi.expectStatus(res, 201);
    await postsApi.expectPostCreated(res, post.title);
  });
});
