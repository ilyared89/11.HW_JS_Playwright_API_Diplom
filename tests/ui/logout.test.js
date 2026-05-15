// @ts-check
import { allure } from 'allure-playwright';
import { test } from '../../src/helpers/fixtures/ui.fixture.js';

test.describe('UI · Logout @UI @AUTH', () => {
  test('Logout after login @SMOKE', async ({ loginPage }) => {
    await allure.epic('bstackdemo');
    await allure.feature('Authentication');
    await allure.story('Logout');
    await allure.severity('normal');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    await loginPage.open();
    await loginPage.login('demouser', 'testingisfun99');
    await loginPage.expectLoginSuccess();

    await loginPage.logout();
    await loginPage.expectLoggedOut();
  });
});
