import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.locator('.search-box-button');
    this.productItems = page.locator('.product-item');
    this.productGrid = page.locator('.product-grid');
    this.noResults = page.locator('.no-result');
    this.loginLink = page.locator('.ico-login');
    this.registerLink = page.locator('.ico-register');
    this.cartLink = page.locator('.ico-cart');
    this.newsletterEmail = page.locator('#newsletter-email');
    this.newsletterButton = page.locator('#newsletter-subscribe-button');
    this.newsletterResult = page.locator('#newsletter-result-block');
  }

  async search(query) {
    await allure.step(`Search: ${query}`, async () => {
      await this.searchInput.fill(query);
      await this.searchButton.click();
    });
  }

  async subscribeToNewsletter(email) {
    await allure.step(`Subscribe newsletter: ${email}`, async () => {
      await this.newsletterEmail.fill(email);
      await this.newsletterButton.click();
    });
  }

  async openProduct(index = 0) {
    await allure.step(`Open product ${index}`, async () => {
      await this.productItems.nth(index).locator('a').first().click();
    });
  }

  async expectSearchResultsVisible() {
    await allure.step('Expect search results visible', async () => {
      await expect(this.productGrid).toBeVisible();
      await this.attachScreenshot('Search results');
    });
  }

  async expectNoResults() {
    await allure.step('Expect no results', async () => {
      await expect(this.noResults).toContainText('No products were found');
      await this.attachScreenshot('No results');
    });
  }

  async expectNewsletterSuccess() {
    await allure.step('Expect newsletter success', async () => {
      await expect(this.newsletterResult).toContainText('Thank you');
      await this.attachScreenshot('Newsletter success');
    });
  }
}
