import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.productName = page.locator('.product-name h1');
    this.price = page.locator('.product-price');
    this.addToCartButton = page.locator('#add-to-cart-button');
    this.quantityInput = page.locator('#addtocart_EnteredQuantity');
    this.barNotification = page.locator('#bar-notification');
    this.cartQuantity = page.locator('.cart-qty');
  }

  async addToCart(quantity = 1) {
    await allure.step(`Add ${quantity} to cart`, async () => {
      if (quantity > 1) {
        await this.quantityInput.fill(String(quantity));
      }
      await this.addToCartButton.click();
      await this.page.waitForTimeout(1000);
    });
  }

  async expectProductLoaded(name) {
    await allure.step(`Expect product loaded: ${name}`, async () => {
      await expect(this.productName).toContainText(name);
      await this.attachScreenshot('Product loaded');
    });
  }

  async expectAddToCartSuccess() {
    await allure.step('Expect add to cart success', async () => {
      await expect(this.barNotification).toContainText('The product has been added');
      await this.attachScreenshot('Add to cart success');
    });
  }
}
