import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";

test.describe("UI · Cart @UI @CART", () => {
  test("Add product to cart and remove it @SMOKE", async ({ app }) => {
    await allure.epic("Demo Web Shop");
    await allure.feature("Cart");
    await allure.severity("critical");

    await app.home.open("/");
    await app.home.search("book");
    await expect(app.home.productGridLocator).toBeVisible();

    await app.home.openProduct(0);
    await app.product.addToCart(1);
    await expect(app.product.notificationLocator).toContainText(
      "The product has been added",
    );

    await app.home.openCart();
    await expect(app.cart.cartItemsLocator).toHaveCount(1);
    await expect(app.cart.productNameLocator.first()).toBeVisible();
    await app.cart.attachScreenshot("Cart with item");

    await app.cart.removeFirstItem();
    await expect(app.cart.emptyCartMessageLocator).toContainText(
      "Your Shopping Cart is empty!",
      { timeout: 10000 },
    );
    await app.cart.attachScreenshot("Cart empty");
  });
});
