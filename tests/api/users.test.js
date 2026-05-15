// @ts-check
import { allure } from 'allure-playwright';
import { apiTest as test } from '../../src/helpers/fixtures/api.fixture.js';
import { newUser } from '../../src/helpers/builders/user.builder.js';

test.describe('API · Users @API @USERS', () => {
  test('Creates a new user @SMOKE @POST', async ({ userApi }) => {
    await allure.epic('reqres.in');
    await allure.feature('Users');
    await allure.story('Create user');
    await allure.severity('blocker');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const user = newUser();
    const res = await userApi.createUser(user);
    await userApi.expectUserCreated(res, user);
  });
});
