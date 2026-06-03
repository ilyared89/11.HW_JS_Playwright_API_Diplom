import { allure } from 'allure-playwright';
import { test, expect } from '../../src/helpers/fixtures/ui.fixture.js';

test.describe('UI · Cart @UI @CART', () => {
  test('Add product to cart and remove it @SMOKE', async ({ homePage, productPage, cartPage }) => {
    await allure.epic('Demo Web Shop');
    await allure.feature('Cart');
    await allure.severity('critical');

    // 1. Открываем главную и ищем товар
    await homePage.open('/');
    await homePage.search('book');
    await expect(homePage.productGridLocator).toBeVisible();

    // 2. Открываем первый товар
    await homePage.openProduct(0);

    // 3. Добавляем в корзину
    await productPage.addToCart(1);
    await expect(productPage.notificationLocator).toContainText('The product has been added');

    // 4. Переходим в корзину
    await homePage.openCart();

    // 5. ✅ Проверка: товар в корзине
    await expect(cartPage.cartItemsLocator).toHaveCount(1);
    await expect(cartPage.productNameLocator.first()).toBeVisible();
    await cartPage.attachScreenshot('Cart with item');

    // 6. Удаляем товар
    await cartPage.removeFirstItem();

    // 7. ✅ Проверка: корзина пуста
    await expect(cartPage.emptyCartMessageLocator).toContainText('Your Shopping Cart is empty!', { timeout: 10000 });
    await cartPage.attachScreenshot('Cart empty');
  });
});