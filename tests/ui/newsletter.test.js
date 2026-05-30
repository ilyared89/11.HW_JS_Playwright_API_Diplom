import { allure } from 'allure-playwright';
import { test } from '../../src/helpers/fixtures/ui.fixture.js';
import { faker } from '@faker-js/faker';

test.describe('UI · Newsletter @UI @NEWSLETTER', () => {
  test('Subscribe to newsletter with valid email @SMOKE', async ({ homePage }) => {
    await allure.epic('demowebshop');
    await allure.feature('Newsletter');
    await allure.story('Subscribe');
    await allure.severity('normal');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const email = faker.internet.email();

    await homePage.open('/');
    await homePage.subscribeToNewsletter(email);
    await homePage.expectNewsletterSuccess();
  });
});
