// @ts-check
import { allure } from 'allure-playwright';
import { apiTest as test } from '../../src/helpers/fixtures/api.fixture.js';

test.describe('API · Users Delete @API @USERS', () => {
  test('Deletes user successfully @SMOKE @DELETE', async ({ userApi }) => {
    await allure.epic('reqres.in');
    await allure.feature('Users');
    await allure.story('Delete user');
    await allure.severity('critical');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const res = await userApi.deleteUser(2);
    await userApi.expectUserDeleted(res);
  });
});
