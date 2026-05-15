// @ts-check
import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page, '/');
    this.shelfItems = page.locator('.shelf-item');
    this.filterSelect = page.locator('.sort select');
    this.vendorFilter = page.locator('.filters .checkmark');
    this.buyButtons = page.locator('.shelf-item__buy-btn');
    this.productTitle = page.locator('.shelf-item__title');
  }

  async filterByPrice(option) {
    await allure.step(`Filter by price: ${option}`, async () => {
      await this.filterSelect.selectOption(option);
      await this.page.waitForTimeout(500);
    });
  }

  async filterByVendor(index) {
    await allure.step(`Filter by vendor index ${index}`, async () => {
      await this.vendorFilter.nth(index).click();
      await this.page.waitForTimeout(500);
    });
  }

  async addFirstProductToCart() {
    await allure.step('Add first product to cart', async () => {
      await this.buyButtons.first().click();
      await this.page.waitForTimeout(500);
    });
  }

  async expectProductsVisible() {
    await allure.step('Expect products visible', async () => {
      await expect(this.shelfItems.first()).toBeVisible();
      await this.attachScreenshot('Products visible');
    });
  }

  async expectProductCount(count) {
    await allure.step(`Expect product count >= ${count}`, async () => {
      await expect(this.shelfItems).toHaveCount(count);
    });
  }
}
