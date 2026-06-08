import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";

test.describe("UI · Authentication @UI @AUTH", () => {
  test("Successful login with valid credentials @SMOKE", async ({ app }) => {
    test.skip(!process.env.DEMO_EMAIL || !process.env.DEMO_PASSWORD, 
      "DEMO_EMAIL and DEMO_PASSWORD not set");

    await allure.epic("demowebshop");
    await allure.feature("Authentication");
    await allure.story("Login");
    await allure.severity("blocker");

    await app.login.open("/login");
    await app.login.login(process.env.DEMO_EMAIL, process.env.DEMO_PASSWORD);
    await expect(app.login.accountHeaderLocator).toBeVisible();
    await app.login.attachScreenshot("Login success");
  });

  test("Shows error for invalid credentials", async ({ app }) => {
    await app.login.open("/login");
    await app.login.login("wrong@example.com", "wrongpass");
    await expect(app.login.errorMessageLocator).toContainText("Login was unsuccessful");
    await app.login.attachScreenshot("Login error");
  });
});