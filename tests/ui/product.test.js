// @ts-check
import { allure } from 'allure-playwright';
import { test } from '../../src/helpers/fixtures/ui.fixture.js';

test.describe('UI · Products @UI @PRODUCTS', () => {
  test('Filter products by vendor @SMOKE', async ({ loginPage, productsPage }) => {
    await allure.epic('bstackdemo');
    await allure.feature('Products');
    await allure.story('Filter by vendor');
    await allure.severity('normal');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    await loginPage.open();
    await loginPage.login('demouser', 'testingisfun99');
    await loginPage.expectLoginSuccess();

    await productsPage.expectProductsVisible();
    await productsPage.filterByVendor(0);
    await productsPage.expectProductCount(4);
  });

  test('Sort products by price', async ({ loginPage, productsPage }) => {
    await allure.epic('bstackdemo');
    await allure.feature('Products');
    await allure.story('Sort by price');
    await allure.severity('minor');
    await allure.owner('ilyared89');

    await loginPage.open();
    await loginPage.login('demouser', 'testingisfun99');
    await loginPage.expectLoginSuccess();

    await productsPage.expectProductsVisible();
    await productsPage.filterByPrice('lowestprice');
    await productsPage.attachScreenshot('Sorted by lowest price');
  });
});
