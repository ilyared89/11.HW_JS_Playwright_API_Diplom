// src/pages/cart.page.js — замени полностью
import { allure } from "allure-playwright";
import { BasePage } from "./base.page.js";

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator(
      ".cart-item-row, .cart-item, tbody tr:has(.product-name)",
    );
    this.productNameInCart = page.locator(".product-name");
    this.removeCheckbox = page.locator('input[name="removefromcart"]');
    this.updateCartButton = page.locator('input[name="updatecart"]');
    this.emptyCartMessage = page
      .locator(".order-summary-content, .page-body")
      .filter({ hasText: "Your Shopping Cart is empty" })
      .first();
    this.checkoutButton = page.locator("#checkout");
  }

  async removeFirstItem() {
    await allure.step("Remove first item from cart", async () => {
      await this.removeCheckbox.first().check();
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
