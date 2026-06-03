import { allure } from 'allure-playwright';
import { test } from '../../src/helpers/fixtures/ui.fixture.js';
import { RegisterPage } from '../../src/pages/index.js';
import { newUser } from '../../src/helpers/builders/index.js';;
import { HomePage, ProductPage, CartPage } from '../../src/pages/index.js';

test.describe('UI · Registration @UI @AUTH', () => {
  test('Successful registration with random data @SMOKE', async ({ registerPage }) => {
    await allure.epic('demowebshop');
    await allure.feature('Authentication');
    await allure.story('Registration');
    await allure.severity('blocker');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const user = newUser();
    user.confirmPassword = user.password;

    await registerPage.open('/register');
    await registerPage.fillForm(user);
    await registerPage.submit();
    await registerPage.expectRegistrationSuccess();
  });

  test('Shows error for mismatched passwords', async ({ registerPage }) => {
    await allure.epic('demowebshop');
    await allure.feature('Authentication');
    await allure.story('Registration — negative');
    await allure.severity('normal');
    await allure.owner('ilyared89');

    const user = newUser();
    user.confirmPassword = 'different';

    await registerPage.open('/register');
    await registerPage.fillForm(user);
    await registerPage.submit();
    await registerPage.expectValidationError('The password and confirmation password do not match');
  });
});
