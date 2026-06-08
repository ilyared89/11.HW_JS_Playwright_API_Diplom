import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";


test.describe("UI · Authentication @UI @AUTH", () => {
  test('Successful login with valid credentials @SMOKE', async ({ app }) => {
    await allure.epic('demowebshop');
    await allure.feature('Authentication');
    await allure.story('Login');
    await allure.severity('blocker');

    await app.login.open('/login');
    await app.login.login(process.env.DEMO_EMAIL, process.env.DEMO_PASSWORD);
    await expect(app.login.accountHeaderLocator).toBeVisible();
    await expect(app.login.accountHeaderLocator).toContainText(process.env.DEMO_EMAIL.split('@')[0]);
    await app.login.attachScreenshot('Login success');
  });
});
