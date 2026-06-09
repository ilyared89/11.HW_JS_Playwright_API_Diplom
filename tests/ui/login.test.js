// tests/ui/login.test.js
import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";

test("Successful login with valid credentials", async ({ app }) => {
  await app.loginPage.open();
  await app.loginPage.login(process.env.DEMO_EMAIL, process.env.DEMO_PASSWORD);

  await expect(app.loginPage.accountHeaderLocator).toBeVisible();

  await expect(app.loginPage.accountHeaderLocator).toContainText("My account");
});
