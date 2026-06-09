// tests/ui/cart.test.js — замени полностью
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";

test("User adds product to cart", async ({ app }) => {
  await app.homePage.open("/");
  await app.homePage.search("book");
  await app.homePage.openProduct(0);

  // Добавляем в корзину
  await app.productPage.addToCart(1);

  //  Проверяем уведомление об успешном добавлении
  await expect(app.productPage.notificationLocator).toContainText(
    "The product has been added",
    { timeout: 10000 },
  );

  // Переходим в корзину
  await app.homePage.openCart();

  // Проверяем, что товар есть в корзине
  await expect(app.cartPage.cartItemsLocator.first()).toBeVisible({
    timeout: 10000,
  });
});

test("User removes product from cart", async ({ app }) => {
  await app.homePage.open("/");
  await app.homePage.search("book");
  await app.homePage.openProduct(0);

  // Добавляем в корзину
  await app.productPage.addToCart(1);
  await expect(app.productPage.notificationLocator).toContainText(
    "The product has been added",
    { timeout: 10000 },
  );

  // Переходим в корзину
  await app.homePage.openCart();

  // Проверяем, что товар добавлен
  const itemsCount = await app.cartPage.cartItemsLocator.count();
  expect(itemsCount).toBeGreaterThan(0);

  // Удаляем товар
  await app.cartPage.removeFirstItem();

  // Проверяем, что корзина пуста
  await expect(app.cartPage.emptyCartMessageLocator).toBeVisible({
    timeout: 10000,
  });
});
