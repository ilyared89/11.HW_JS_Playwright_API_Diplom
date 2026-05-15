// @ts-check
import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page, '/');
    this.cartBadge = page.locator('.float-cart__badge');
    this.floatCart = page.locator('.float-cart__content');
    this.cartItems = page.locator('.float-cart__shelf-container .shelf-item');
    this.checkoutButton = page.locator('.buy-btn');
    this.openCartButton = page.locator('.bag');
  }

  async openCart() {
    await allure.step('Open cart', async () => {
      await this.openCartButton.click();
      await expect(this.floatCart).toBeVisible();
    });
  }

  async expectCartHasItems(count) {
    await allure.step(`Expect cart has ${count} item(s)`, async () => {
      await this.openCart();
      await expect(this.cartItems).toHaveCount(count);
      await this.attachScreenshot('Cart items');
    });
  }

  async proceedToCheckout() {
    await allure.step('Proceed to checkout', async () => {
      await this.openCart();
      await this.checkoutButton.click();
    });
  }
}
