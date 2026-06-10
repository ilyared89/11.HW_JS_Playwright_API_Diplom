// tests/ui/login.test.js
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";

test("Successful login with valid credentials", async ({ app }) => {
  await app.loginPage.open();
  await app.loginPage.login(process.env.DEMO_EMAIL, process.env.DEMO_PASSWORD);

  // ✅ После логина: элемент "My account" виден
  await expect(app.loginPage.accountHeaderLocator).toBeVisible();
  await expect(app.loginPage.accountHeaderLocator).toContainText("My account");
});