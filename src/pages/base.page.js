// src/pages/base.page.js — замени полностью
import { allure } from "allure-playwright";

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(url) {
    if (!url) {
      throw new Error(`BasePage.open() called without url.`);
    }
    const baseUrl = process.env.BASE_URL || "https://demowebshop.tricentis.com";
    const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
    console.log(`[BasePage.open] Navigating to: ${fullUrl}`);
    await this.page.goto(fullUrl);
  }

  async attachScreenshot(name) {
    await allure.attachment(name, await this.page.screenshot(), {
      contentType: "image/png",
    });
  }
}
