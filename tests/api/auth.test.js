// @ts-check
import { allure } from 'allure-playwright';
import { apiTest as test } from '../../src/helpers/fixtures/api.fixture.js';

test.describe('API · Authentication @API @AUTH', () => {
  test('Registers a new user successfully @SMOKE @POST', async ({ authApi }) => {
    await allure.epic('reqres.in');
    await allure.feature('Authentication');
    await allure.story('Register');
    await allure.severity('blocker');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const res = await authApi.register('eve.holt@reqres.in', 'pistol');
    await authApi.expectRegisterSuccess(res);
  });

  test('Returns error for missing password on register @POST', async ({ authApi }) => {
    await allure.epic('reqres.in');
    await allure.feature('Authentication');
    await allure.story('Register — negative');
    await allure.severity('normal');
    await allure.owner('ilyared89');

    const res = await authApi.register('sydney@fife', '');
    await authApi.expectRegisterError(res, 'Missing password');
  });

  test('Logs in with valid credentials @SMOKE @POST', async ({ authApi }) => {
    await allure.epic('reqres.in');
    await allure.feature('Authentication');
    await allure.story('Login');
    await allure.severity('blocker');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const res = await authApi.login('eve.holt@reqres.in', 'cityslicka');
    await authApi.expectLoginSuccess(res);
  });

  test('Returns error for missing password on login @POST', async ({ authApi }) => {
    await allure.epic('reqres.in');
    await allure.feature('Authentication');
    await allure.story('Login — negative');
    await allure.severity('normal');
    await allure.owner('ilyared89');

    const res = await authApi.login('peter@klaven', '');
    await authApi.expectLoginError(res, 'Missing password');
  });
});
