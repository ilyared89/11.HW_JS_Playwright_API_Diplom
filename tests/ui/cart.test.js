import { allure } from 'allure-playwright';
import { test } from '../../src/helpers/fixtures/ui.fixture.js';

test.describe('UI · Cart @UI @CART', () => {
  test('Add product to cart and remove it @SMOKE', async ({ homePage, productPage, cartPage }) => {
    await allure.epic('demowebshop');
    await allure.feature('Cart');
    await allure.story('Add and remove from cart');
    await allure.severity('critical');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    await homePage.open('/');
    await homePage.openProduct(0);
    await productPage.addToCart();
    await productPage.expectAddToCartSuccess();

    await cartPage.open('/cart');
    await cartPage.expectCartHasItems(1);
    await cartPage.removeFirstItem();
    await cartPage.expectCartEmpty();
  });
});
