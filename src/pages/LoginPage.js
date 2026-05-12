import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-btn');
    this.errorMessage = page.locator('.error-message');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginSuccess() {
    await expect(this.page.locator('.products-grid')).toBeVisible();
  }

  async assertLoginError(expectedMessage) {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}