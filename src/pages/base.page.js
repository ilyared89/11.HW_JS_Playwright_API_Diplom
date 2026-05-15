// @ts-check
import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';

export class BasePage {
  constructor(page, path = '/') {
    this.page = page;
    this.path = path;
  }

  async open() {
    await allure.step(`Open page ${this.path}`, async () => {
      await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
    });
  }

  async attachScreenshot(name) {
    const png = await this.page.screenshot({ fullPage: false });
    await allure.attachment(name, png, 'image/png');
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(new RegExp(this.path.replace('/', '\\/') + '$'));
  }
}
