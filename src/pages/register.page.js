import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.genderMale = page.locator('#gender-male');
    this.genderFemale = page.locator('#gender-female');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.resultMessage = page.locator('.result');
    this.validationErrors = page.locator('.field-validation-error');
  }

  async fillForm(user) {
    await allure.step('Fill registration form', async () => {
      if (user.gender === 'male') await this.genderMale.check();
      if (user.gender === 'female') await this.genderFemale.check();
      await this.firstNameInput.fill(user.firstName);
      await this.lastNameInput.fill(user.lastName);
      await this.emailInput.fill(user.email);
      await this.passwordInput.fill(user.password);
      await this.confirmPasswordInput.fill(user.confirmPassword);
    });
  }

  async submit() {
    await allure.step('Submit registration', async () => {
      await this.registerButton.click();
    });
  }

  async expectRegistrationSuccess() {
    await allure.step('Expect registration success', async () => {
      await expect(this.resultMessage).toContainText('Your registration completed');
      await this.attachScreenshot('Registration success');
    });
  }

  async expectValidationError(expectedMessage) {
    await allure.step('Expect validation error', async () => {
      await expect(this.validationErrors.first()).toContainText(expectedMessage);
      await this.attachScreenshot('Validation error');
    });
  }
}
