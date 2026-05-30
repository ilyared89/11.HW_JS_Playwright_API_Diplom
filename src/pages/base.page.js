import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path = '/') {
    await allure.step(`Open page ${path}`, async () => {
      await this.page.goto(path);
    });
  }

  async attachScreenshot(name) {
    const png = await this.page.screenshot({ fullPage: false });
    await allure.attachment(name, png, 'image/png');
  }

  async expectUrlContains(substring) {
    await expect(this.page).toHaveURL(new RegExp(substring));
  }
}
