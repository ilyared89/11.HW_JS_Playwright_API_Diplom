import { allure } from 'allure-playwright';
import { apiTest as test } from '../../src/helpers/fixtures/api.fixture.js';

test.describe('API · Posts Delete @API @POSTS', () => {
  test('Deletes post successfully @SMOKE @DELETE', async ({ postsApi }) => {
    await allure.epic('json-server');
    await allure.feature('Posts');
    await allure.story('Delete post');
    await allure.severity('critical');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const res = await postsApi.delete(1);
    await postsApi.expectStatus(res, 200);
  });
});
