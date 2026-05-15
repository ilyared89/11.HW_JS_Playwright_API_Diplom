// @ts-check
import { allure } from 'allure-playwright';
import { apiTest as test } from '../../src/helpers/fixtures/api.fixture.js';
import { newUser } from '../../src/helpers/builders/user.builder.js';

test.describe('API · Users Update @API @USERS', () => {
  test('Updates user with PUT @SMOKE @PUT', async ({ userApi }) => {
    await allure.epic('reqres.in');
    await allure.feature('Users');
    await allure.story('Update user');
    await allure.severity('critical');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const user = newUser();
    const res = await userApi.updateUser(2, user);
    await userApi.expectUserUpdated(res, user);
  });

  test('Partially updates user with PATCH @PATCH', async ({ userApi }) => {
    await allure.epic('reqres.in');
    await allure.feature('Users');
    await allure.story('Partial update user');
    await allure.severity('normal');
    await allure.owner('ilyared89');

    const payload = { name: 'Updated Name' };
    const res = await userApi.patchUser(2, payload);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toBe(payload.name);
  });
});
