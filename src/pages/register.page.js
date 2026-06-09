// src/pages/register.page.js — замени полностью
import { allure } from "allure-playwright";
import { BasePage } from "./base.page.js";

export class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.registerUrl = "/register";

    // Локаторы регистрации
    this.genderMale = page.locator("#gender-male");
    this.genderFemale = page.locator("#gender-female");
    this.firstNameInput = page.getByLabel("First name:");
    this.lastNameInput = page.getByLabel("Last name:");
    this.emailInput = page.getByLabel("Email:");
    this.passwordInput = page.getByLabel("Password:", { exact: true });
    this.confirmPasswordInput = page.getByLabel("Confirm password:");
    this.registerButton = page.getByRole("button", { name: "Register" });

    // Результат
    this.successMessage = page.locator(".result");
    this.errorMessage = page.locator(".validation-summary-errors");
  }

  async open() {
    await super.open(this.registerUrl);
  }

  async register(user) {
    await allure.step("Fill registration form", async () => {
      // Выбор пола (если указан)
      if (user.gender === "male") {
        await this.genderMale.check();
      } else if (user.gender === "female") {
        await this.genderFemale.check();
      }

      await this.firstNameInput.fill(user.firstName);
      await this.lastNameInput.fill(user.lastName);
      await this.emailInput.fill(user.email);
      await this.passwordInput.fill(user.password);
      await this.confirmPasswordInput.fill(user.confirmPassword);
      await this.registerButton.click();
    });
  }

  get successMessageLocator() {
    return this.successMessage;
  }
}
