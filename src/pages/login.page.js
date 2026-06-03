import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByLabel('Email:');
    this.passwordInput = page.getByLabel('Password:');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.errorMessage = page.locator('.validation-summary-errors');
    this.accountHeader = page.locator('.account');
    this.registerLink = page.getByRole('link', { name: 'Register' });
  }

  async login(email, password) {
    await allure.step(`Login as ${email}`, async () => {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    });
  }

  async goToRegister() {
    await allure.step('Go to register page', async () => {
      await this.registerLink.click();
    });
  }

  get accountHeaderLocator() { return this.accountHeader; }
  get errorMessageLocator() { return this.errorMessage; }
}