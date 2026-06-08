import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";
import { UserBuilder } from "../../src/helpers/builders/index.js";

test.describe("UI · Registration @UI @AUTH", () => {
  test("Successful registration with random data @SMOKE", async ({ app }) => {
    await allure.epic("demowebshop");
    await allure.feature("Authentication");
    await allure.story("Registration");
    await allure.severity("blocker");

    const user = new UserBuilder()
      .addGender()
      .addFirstName()
      .addLastName()
      .addEmail()
      .addPassword()
      .addCountry()
      .addCity()
      .addAddress()
      .addZipCode()
      .addPhone()
      .build();

    await app.register.open("/register");
    await app.register.fillForm(user);
    await app.register.submit();
    await expect(app.register.resultMessageLocator).toContainText(
      "Your registration completed",
    );
    await app.register.attachScreenshot("Registration success");
  });

  test("Shows error for mismatched passwords", async ({ app }) => {
    await app.register.open("/register");
    const user = new UserBuilder()
      .addGender()
      .addFirstName()
      .addLastName()
      .addEmail()
      .addPassword()
      .addCountry()
      .addCity()
      .addAddress()
      .addZipCode()
      .addPhone()
      .build();
    user.confirmPassword = "different";

    await app.register.fillForm(user);
    await app.register.submit();
    await expect(app.register.validationErrorsLocator.first()).toContainText(
      "The password and confirmation password do not match",
    );
    await app.register.attachScreenshot("Validation error");
  });
});
