// @ts-check
import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import { ProductsPage } from '../../pages/products.page.js';
import { CartPage } from '../../pages/cart.page.js';
import { CheckoutPage } from '../../pages/checkout.page.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  productsPage: async ({ page }, use) => { await use(new ProductsPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
  checkoutPage: async ({ page }, use) => { await use(new CheckoutPage(page)); },
});

export { expect } from '@playwright/test';
