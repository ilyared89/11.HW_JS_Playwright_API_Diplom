// @ts-check
import { allure } from 'allure-playwright';
import { test } from '../../src/helpers/fixtures/ui.fixture.js';
import { faker } from '@faker-js/faker';

test.describe('UI · Checkout @UI @CHECKOUT', () => {
  test('Complete checkout with valid data @SMOKE', async ({ loginPage, productsPage, cartPage, checkoutPage, page }) => {
    await allure.epic('bstackdemo');
    await allure.feature('Checkout');
    await allure.story('Complete order');
    await allure.severity('blocker');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    await loginPage.open();
    await loginPage.login('demouser', 'testingisfun99');
    await loginPage.expectLoginSuccess();

    await productsPage.expectProductsVisible();
    await productsPage.addFirstProductToCart();
    await cartPage.proceedToCheckout();

    const details = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      postalCode: faker.location.zipCode(),
      phone: faker.phone.number(),
    };

    await checkoutPage.fillShippingDetails(details);
    await checkoutPage.submitOrder();
    await checkoutPage.expectOrderSuccess();
  });
});
