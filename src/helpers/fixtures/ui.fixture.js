import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import { RegisterPage } from '../../pages/register.page.js';
import { HomePage } from '../../pages/home.page.js';
import { ProductPage } from '../../pages/product.page.js';
import { CartPage } from '../../pages/cart.page.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  registerPage: async ({ page }, use) => { await use(new RegisterPage(page)); },
  homePage: async ({ page }, use) => { await use(new HomePage(page)); },
  productPage: async ({ page }, use) => { await use(new ProductPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
});

export { expect } from '@playwright/test';
