import { allure } from 'allure-playwright';
import { test, expect } from '../../src/helpers/fixtures/ui.fixture.js';

test.describe('UI · Authentication @UI @AUTH', () => {
  test('Successful login with valid credentials @SMOKE', async ({ loginPage }) => {
    await allure.epic('demowebshop');
    await allure.feature('Authentication');
    await allure.story('Login');
    await allure.severity('blocker');

    await loginPage.open('/login');
    await loginPage.login('testuser@example.com', 'TestPassword123');
    await expect(loginPage.accountHeaderLocator).toBeVisible();
    await loginPage.attachScreenshot('Login success');
  });

  test('Shows error for invalid credentials', async ({ loginPage }) => {
    await loginPage.open('/login');
    await loginPage.login('wrong@example.com', 'wrongpass');
    await expect(loginPage.errorMessageLocator).toContainText('Login was unsuccessful');
    await loginPage.attachScreenshot('Login error');
  });
});