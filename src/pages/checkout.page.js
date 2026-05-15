// @ts-check
import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page, '/checkout');
    this.firstName = page.locator('#firstNameInput');
    this.lastName = page.locator('#lastNameInput');
    this.address = page.locator('#addressLine1Input');
    this.city = page.locator('#cityInput');
    this.postalCode = page.locator('#postalCodeInput');
    this.phone = page.locator('#phoneInput');
    this.submitButton = page.locator('#checkout-shipping-continue');
    this.confirmationMessage = page.locator('.checkout-confirmation');
    this.errorMessages = page.locator('.error-message');
  }

  async fillShippingDetails(details) {
    await allure.step('Fill shipping details', async () => {
      await this.firstName.fill(details.firstName);
      await this.lastName.fill(details.lastName);
      await this.address.fill(details.address);
      await this.city.fill(details.city);
      await this.postalCode.fill(details.postalCode);
      await this.phone.fill(details.phone);
    });
  }

  async submitOrder() {
    await allure.step('Submit order', async () => {
      await this.submitButton.click();
    });
  }

  async expectOrderSuccess() {
    await allure.step('Expect order success', async () => {
      await expect(this.confirmationMessage).toBeVisible();
      await this.attachScreenshot('Order success');
    });
  }

  async expectValidationErrors() {
    await allure.step('Expect validation errors', async () => {
      await expect(this.errorMessages.first()).toBeVisible();
      await this.attachScreenshot('Validation errors');
    });
  }
}
