// @ts-check
import { allure } from 'allure-playwright';
import { apiTest as test, expect } from '../../src/helpers/fixtures/api.fixture.js';

test.describe('API · Users Get @API @USERS', () => {
  test('Gets an existing user @SMOKE @GET', async ({ userApi }) => {
    await allure.epic('reqres.in');
    await allure.feature('Users');
    await allure.story('Get user');
    await allure.severity('critical');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const res = await userApi.getUser(2);
    await userApi.expectUserFound(res, 2);
  });

  test('Returns 404 for non-existing user @GET', async ({ userApi }) => {
    await allure.epic('reqres.in');
    await allure.feature('Users');
    await allure.story('Get non-existing user');
    await allure.severity('normal');
    await allure.owner('ilyared89');

    const res = await userApi.getUser(9999);
    expect(res.status()).toBe(404);
  });
});
