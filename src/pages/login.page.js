import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('input[value="Log in"]');
    this.errorMessage = page.locator('.validation-summary-errors');
    this.accountHeader = page.locator('.account');
    this.registerLink = page.locator('a[href="/register"]');
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

  async expectLoginSuccess() {
    await allure.step('Expect login success', async () => {
      await expect(this.accountHeader).toBeVisible();
      await this.attachScreenshot('Login success');
    });
  }

  async expectLoginError(expectedMessage) {
    await allure.step('Expect login error', async () => {
      await expect(this.errorMessage).toContainText(expectedMessage);
      await this.attachScreenshot('Login error');
    });
  }
}
