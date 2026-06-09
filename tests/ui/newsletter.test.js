// tests/ui/newsletter.test.js — замени полностью
import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";
import { UserBuilder } from "../../src/helpers/builders/index.js";

test("Subscribe to newsletter", async ({ app }) => {
  await app.page.goto(
    process.env.BASE_URL || "https://demowebshop.tricentis.com/",
  );

  const { email } = new UserBuilder().addEmail().build();
  await app.homePage.subscribeToNewsletter(email);

  await expect(app.homePage.newsletterSuccessMessage).toBeVisible({
    timeout: 10000,
  });
});
