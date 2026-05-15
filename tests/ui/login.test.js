// @ts-check
import { allure } from 'allure-playwright';
import { test } from '../../src/helpers/fixtures/ui.fixture.js';

test.describe('UI · Authentication @UI @AUTH', () => {
  test('Successful login with valid credentials @SMOKE', async ({ loginPage }) => {
    await allure.epic('bstackdemo');
    await allure.feature('Authentication');
    await allure.story('Login');
    await allure.severity('blocker');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    await loginPage.open();
    await loginPage.login('demouser', 'testingisfun99');
    await loginPage.expectLoginSuccess();
  });

  test('Shows error for invalid credentials', async ({ loginPage }) => {
    await allure.epic('bstackdemo');
    await allure.feature('Authentication');
    await allure.story('Login — negative');
    await allure.severity('normal');
    await allure.owner('ilyared89');

    await loginPage.open();
    await loginPage.login('wronguser', 'wrongpass');
    await loginPage.expectLoginError('Invalid username or password');
  });
});
