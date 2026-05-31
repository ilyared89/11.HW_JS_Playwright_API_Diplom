// src/pages/cart.page.js
import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart-item-row');
    this.productNameInCart = page.locator('.product-name');
    this.removeButton = page.locator('input[value="Remove"]');
    this.updateCartButton = page.locator('input[name="updatecart"]');
    this.emptyCartMessage = page.locator('.no-data');
    this.checkoutButton = page.locator('#checkout');
  }

  async expectItemInCart(productName) {
    await allure.step(`Expect item in cart: ${productName}`, async () => {
      const item = this.productNameInCart.filter({ hasText: productName });
      await expect(item.first()).toBeVisible({ timeout: 10000 });
      await this.attachScreenshot(`Item ${productName} in cart`);
    });
  }

  async removeFirstItem() {
    await allure.step('Remove first item from cart', async () => {
      await this.removeButton.first().click({ force: true });
      await this.updateCartButton.click({ force: true });
      await this.page.waitForLoadState('networkidle');
    });
  }

  async expectCartEmpty() {
    await allure.step('Expect cart is empty', async () => {
      await expect(this.emptyCartMessage).toBeVisible({ timeout: 10000 });
      await this.attachScreenshot('Cart empty');
    });
  }
}