import { allure } from 'allure-playwright';
import { test, expect } from '../../src/helpers/fixtures/ui.fixture.js';
import { UserBuilder } from '../../src/helpers/builders/index.js';
import { HomePage, ProductPage, CartPage } from '../../src/pages/index.js';

test.describe('UI · Newsletter @UI @NEWSLETTER', () => {
  test('Subscribe to newsletter with valid email @SMOKE', async ({ homePage }) => {
    await allure.epic('demowebshop');
    await allure.feature('Newsletter');
    await allure.story('Subscribe');
    await allure.severity('normal');

    const email = new UserBuilder().addEmail().build().email;

    await homePage.open('/');
    await homePage.subscribeToNewsletter(email);
    await expect(homePage.newsletterResultLocator).toContainText('Thank you');
    await homePage.attachScreenshot('Newsletter success');
  });
});