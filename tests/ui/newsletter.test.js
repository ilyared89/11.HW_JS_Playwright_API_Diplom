import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";
import { UserBuilder } from "../../src/helpers/builders/index.js";

test.describe("UI · Newsletter @UI @NEWSLETTER", () => {
  test("Subscribe to newsletter with valid email @SMOKE", async ({ app }) => {
    await allure.epic("demowebshop");
    await allure.feature("Newsletter");
    await allure.story("Subscribe");
    await allure.severity("normal");

    const email = new UserBuilder().addEmail().build().email;

    await app.home.open("/");
    await app.home.subscribeToNewsletter(email);
    await expect(app.home.newsletterResultLocator).toContainText("Thank you");
    await app.home.attachScreenshot("Newsletter success");
  });
});
