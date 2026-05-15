// @ts-check
import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page, '/');
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-btn');
    this.errorMessage = page.locator('.error-message');
    this.productsGrid = page.locator('.shelf-container');
    this.logoutLink = page.locator('#logout');
  }

  async login(username, password) {
    await allure.step(`Log in as ${username}`, async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    });
  }

  async logout() {
    await allure.step('Log out', async () => {
      await this.logoutLink.click();
    });
  }

  async expectLoginSuccess() {
    await allure.step('Expect login success', async () => {
      await expect(this.productsGrid).toBeVisible();
      await this.attachScreenshot('Login success');
    });
  }

  async expectLoginError(expectedMessage) {
    await allure.step('Expect login error', async () => {
      await expect(this.errorMessage).toContainText(expectedMessage);
      await this.attachScreenshot('Login error');
    });
  }

  async expectLoggedOut() {
    await allure.step('Expect logged out', async () => {
      await expect(this.loginButton).toBeVisible();
      await this.attachScreenshot('Logged out');
    });
  }
}
