import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart-item-row');
    this.productNames = page.locator('.product-name');
    this.removeCheckboxes = page.locator('input[name="removefromcart"]');
    this.updateCartButton = page.locator('input[name="updatecart"]');
    this.termsOfService = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
    this.emptyCartMessage = page.locator('.order-summary-content');
    this.cartQuantity = page.locator('.cart-qty');
  }

  async removeFirstItem() {
    await allure.step('Remove first item', async () => {
      await this.removeCheckboxes.first().check();
      await this.updateCartButton.click();
    });
  }

  async agreeToTerms() {
    await allure.step('Agree to terms', async () => {
      await this.termsOfService.check();
    });
  }

  async proceedToCheckout() {
    await allure.step('Proceed to checkout', async () => {
      await this.checkoutButton.click();
    });
  }

  async expectCartHasItems(count) {
    await allure.step(`Expect cart has ${count} item(s)`, async () => {
      await expect(this.cartItems).toHaveCount(count);
      await this.attachScreenshot('Cart items');
    });
  }

  async expectCartEmpty() {
    await allure.step('Expect cart empty', async () => {
      await expect(this.emptyCartMessage).toContainText('Your Shopping Cart is empty');
      await this.attachScreenshot('Empty cart');
    });
  }

  async expectCartCounter(expected) {
    await allure.step(`Expect cart counter: ${expected}`, async () => {
      await expect(this.cartQuantity).toHaveText(expected);
    });
  }
}
