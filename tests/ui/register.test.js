import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";
import { newUser } from "../../src/helpers/builders/index.js";

test.describe("UI · Registration @UI @AUTH", () => {
  test("Successful registration with random data @SMOKE", async ({
    registerPage,
  }) => {
    await allure.epic("demowebshop");
    await allure.feature("Authentication");
    await allure.story("Registration");
    await allure.severity("blocker");

    const user = newUser();

    await registerPage.open("/register");
    await registerPage.fillForm(user);
    await registerPage.submit();
    await expect(registerPage.resultMessageLocator).toContainText(
      "Your registration completed",
    );
    await registerPage.attachScreenshot("Registration success");
  });

  test("Shows error for mismatched passwords", async ({ registerPage }) => {
    await registerPage.open("/register");
    const user = newUser();
    user.confirmPassword = "different";

    await registerPage.fillForm(user);
    await registerPage.submit();
    await expect(registerPage.validationErrorsLocator.first()).toContainText(
      "The password and confirmation password do not match",
    );
    await registerPage.attachScreenshot("Validation error");
  });
});
