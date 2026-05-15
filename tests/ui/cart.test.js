// @ts-check
import { allure } from 'allure-playwright';
import { test } from '../../src/helpers/fixtures/ui.fixture.js';

test.describe('UI · Cart @UI @CART', () => {
  test('Add product to cart @SMOKE', async ({ loginPage, productsPage, cartPage }) => {
    await allure.epic('bstackdemo');
    await allure.feature('Cart');
    await allure.story('Add to cart');
    await allure.severity('critical');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    await loginPage.open();
    await loginPage.login('demouser', 'testingisfun99');
    await loginPage.expectLoginSuccess();

    await productsPage.expectProductsVisible();
    await productsPage.addFirstProductToCart();
    await cartPage.expectCartHasItems(1);
  });
});
