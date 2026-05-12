import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage.js';
import { testData } from '../../src/utils/dataGenerator.js';
import { customAsserts } from '../../src/utils/assertions.js';

test('Успешный вход с валидными данными', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://bstackdemo.com/');
  
  const credentials = testData.generateUser(); // или фиксированные для demo
  await loginPage.login('demouser', 'testingisfun99');
  await loginPage.assertLoginSuccess();
  
  // Кастомный ассерт из utils
  await customAsserts.assertUrlContains(page, '/index.html');
});