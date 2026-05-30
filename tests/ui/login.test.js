import { allure } from 'allure-playwright';
import { test } from '../../src/helpers/fixtures/ui.fixture.js';

test.describe('UI · Authentication @UI @AUTH', () => {
  test('Successful login with valid credentials @SMOKE', async ({ loginPage }) => {
    await allure.epic('demowebshop');
    await allure.feature('Authentication');
    await allure.story('Login');
    await allure.severity('blocker');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    await loginPage.open('/login');
    await loginPage.login('testuser@example.com', 'TestPassword123');
    await loginPage.expectLoginSuccess();
  });

  test('Shows error for invalid credentials', async ({ loginPage }) => {
    await allure.epic('demowebshop');
    await allure.feature('Authentication');
    await allure.story('Login — negative');
    await allure.severity('normal');
    await allure.owner('ilyared89');

    await loginPage.open('/login');
    await loginPage.login('wrong@example.com', 'wrongpass');
    await loginPage.expectLoginError('Login was unsuccessful');
  });
});
