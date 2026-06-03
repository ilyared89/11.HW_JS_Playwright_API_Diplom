import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // ✅ Без ID — через name / value / CSS-классы
    this.searchInput = page.locator('input[name="q"]');
    this.searchButton = page.locator('input[value="Search"]');
    this.productItems = page.locator('.product-item');
    this.productGrid = page.locator('.product-grid');
    this.noResults = page.getByText('No products were found');
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.cartLink = page.getByRole('link', { name: 'Shopping cart' }).first();
    this.newsletterEmail = page.locator('input[name="NewsletterEmail"]');
    this.newsletterButton = page.locator('input[value="Subscribe"]');
    this.newsletterResult = page.locator('#newsletter-result-block');
  }

  async search(query) {
    await allure.step(`Search: ${query}`, async () => {
      await this.searchInput.fill(query);
      await this.searchButton.click();
    });
  }

  async openCart() {
    await allure.step('Open cart page', async () => {
      await this.cartLink.click();
      await this.page.waitForLoadState('networkidle');
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

  // Геттеры для проверок в тестах
  get productGridLocator() { return this.productGrid; }
  get noResultsLocator() { return this.noResults; }
  get newsletterResultLocator() { return this.newsletterResult; }
}