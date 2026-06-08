import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";

test.describe("UI · Authentication @UI @AUTH", () => {
  test.beforeAll(() => {
    if (!process.env.DEMO_EMAIL || !process.env.DEMO_PASSWORD) {
      throw new Error(
        "DEMO_EMAIL and DEMO_PASSWORD must be set in environment variables",
      );
    }
  });

  test("Successful login with valid credentials @SMOKE", async ({ app }) => {
    await allure.epic("demowebshop");
    await allure.feature("Authentication");
    await allure.story("Login");
    await allure.severity("blocker");

    await app.login.open("/login");
    await app.login.login(process.env.DEMO_EMAIL, process.env.DEMO_PASSWORD);
    await expect(app.login.accountHeaderLocator).toBeVisible();
    await app.login.attachScreenshot("Login success");
  });
});
