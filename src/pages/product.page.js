// src/pages/product.page.js — замени полностью
import { allure } from "allure-playwright";
import { BasePage } from "./base.page.js";

export class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.productName = page.getByRole("heading", { level: 1 });
    this.price = page.locator(".product-price");
    this.addToCartButton = page
      .getByRole("button", { name: "Add to cart" })
      .first();
    // Пробуем разные селекторы для quantity
    this.quantityInput = page
      .locator('input.qty-input, input[id*="qty"], input[name*="qty"]')
      .first();
    this.barNotification = page.locator("#bar-notification");
    this.closeNotification = page.locator("#bar-notification .close");
    this.cartQuantity = page.locator(".cart-qty");
  }

  async selectFirstOptionIfNeeded() {
    await allure.step("Select first option if required", async () => {
      const selects = this.page.locator("select.product-attribute");
      const count = await selects.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          await selects.nth(i).selectOption({ index: 1 });
        }
      }
      const radios = this.page.locator(
        '.product-attribute-radio input[type="radio"]',
      );
      const radioCount = await radios.count();
      if (radioCount > 0) {
        await radios.first().click();
      }
    });
  }

  async addToCart(quantity = 1) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.selectFirstOptionIfNeeded();

    await allure.step(`Add ${quantity} item(s) to cart`, async () => {
      // Проверяем, есть ли поле quantity
      const isQtyVisible = await this.quantityInput
        .isVisible()
        .catch(() => false);

      if (isQtyVisible) {
        await this.quantityInput.fill(quantity.toString());
      }

      await this.addToCartButton.click();

      // Скриншот только если папка существует
      // await this.page.screenshot({ path: `screenshots/${Date.now()}-cart.png` });
    });
  }

  get notificationLocator() {
    return this.barNotification;
  }
  get productNameLocator() {
    return this.productName;
  }
}
