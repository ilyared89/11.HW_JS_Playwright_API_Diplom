// src/pages/home.page.js — замени полностью
import { allure } from "allure-playwright";
import { BasePage } from "./base.page.js";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator("#small-searchterms");
    this.searchButton = page.locator(".search-box-button");
    this.searchResults = page.locator(".product-item, .item-box");
    this.noResultsMessage = page
      .locator(".no-result, .warning, .page-body")
      .filter({ hasText: /no products were found|No products were found/i })
      .first();

    this.newsletterEmail = page.locator("#newsletter-email");
    this.newsletterSubscribeButton = page.locator(
      "#newsletter-subscribe-button",
    );
    this.newsletterSuccessMessage = page
      .locator("#newsletter-result-block, .newsletter-result, .page-body")
      .filter({ hasText: /Thank you|success/i })
      .first();

    this.cartLink = page.locator('#topcartlink a[href="/cart"]').first();
  }

  async search(term) {
    await allure.step(`Search for "${term}"`, async () => {
      await this.searchInput.fill(term);
      await this.searchButton.click();
    });
  }

  async openProduct(index) {
    await allure.step(`Open product at index ${index}`, async () => {
      await this.searchResults.nth(index).click();
    });
  }

  async openCart() {
    await allure.step("Open shopping cart", async () => {
      await this.cartLink.click();
    });
  }

  async subscribeToNewsletter(email) {
    await allure.step(`Subscribe to newsletter with ${email}`, async () => {
      await this.newsletterEmail.fill(email);
      await this.newsletterSubscribeButton.click();
    });
  }
}
