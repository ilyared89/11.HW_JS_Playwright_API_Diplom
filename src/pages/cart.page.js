import { allure } from "allure-playwright";
import { BasePage } from "./base.page.js";

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator(".cart-item-row");
    this.productNameInCart = page.locator(".product-name");
    // ✅ nopCommerce: удаление через чекбокс + Update
    this.removeCheckbox = page.locator('input[name="removefromcart"]');
    this.updateCartButton = page.locator('input[name="updatecart"]');
    this.emptyCartMessage = page.locator(".order-summary-content");
    this.checkoutButton = page.locator("#checkout");
  }

  async removeFirstItem() {
    await allure.step("Remove first item from cart", async () => {
      // Отмечаем чекбокс удаления у первого товара
      await this.removeCheckbox.first().check();
      // Нажимаем Update shopping cart
      await this.updateCartButton.click();
      await this.page.waitForLoadState("networkidle");
    });
  }

  get emptyCartMessageLocator() {
    return this.emptyCartMessage;
  }
  get productNameLocator() {
    return this.productNameInCart;
  }
  get cartItemsLocator() {
    return this.cartItems;
  }
}
