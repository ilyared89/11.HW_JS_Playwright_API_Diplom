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
    this.quantityInput = page.getByLabel("Qty:");
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
    await allure.step(`Add ${quantity} to cart`, async () => {
      await this.selectFirstOptionIfNeeded();
      if (quantity > 1) {
        await this.quantityInput.fill(String(quantity));
      }
      await this.addToCartButton.click();
      //await this.closeNotification.click({ force: true });//
      await this.attachScreenshot("Added to cart");
    });
  }

  get notificationLocator() {
    return this.barNotification;
  }
  get productNameLocator() {
    return this.productName;
  }
}
