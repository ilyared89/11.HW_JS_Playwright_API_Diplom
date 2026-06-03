import { allure } from "allure-playwright";
import { BasePage } from "./base.page.js";

export class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.genderMale = page.getByRole("radio", { name: "Male", exact: true });
    this.genderFemale = page.getByRole("radio", {
      name: "Female",
      exact: true,
    });
    this.firstNameInput = page.getByLabel("First name:", { exact: true });
    this.lastNameInput = page.getByLabel("Last name:", { exact: true });
    this.emailInput = page.getByLabel("Email:", { exact: true });
    this.passwordInput = page.getByRole("textbox", {
      name: "Password:",
      exact: true,
    });
    this.confirmPasswordInput = page.getByRole("textbox", {
      name: "Confirm password:",
      exact: true,
    });
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.resultMessage = page.locator(".result");
    this.validationErrors = page.locator(".field-validation-error");
  }

  async fillForm(user) {
    await allure.step("Fill registration form", async () => {
      if (user.gender === "male") await this.genderMale.check();
      if (user.gender === "female") await this.genderFemale.check();
      await this.firstNameInput.fill(user.firstName);
      await this.lastNameInput.fill(user.lastName);
      await this.emailInput.fill(user.email);
      await this.passwordInput.fill(user.password);
      await this.confirmPasswordInput.fill(user.confirmPassword);
    });
  }

  async submit() {
    await allure.step("Submit registration", async () => {
      await this.registerButton.click();
    });
  }

  get resultMessageLocator() {
    return this.resultMessage;
  }
  get validationErrorsLocator() {
    return this.validationErrors;
  }
}
