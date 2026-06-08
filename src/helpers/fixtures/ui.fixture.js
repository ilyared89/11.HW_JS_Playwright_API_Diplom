import { test as base } from "@playwright/test";
import { LoginPage, RegisterPage, HomePage, ProductPage, CartPage } from "../../pages/index.js";

class App {
  constructor(page) {
    this.page = page;
    this.login = new LoginPage(page);
    this.register = new RegisterPage(page);
    this.home = new HomePage(page);
    this.product = new ProductPage(page);
    this.cart = new CartPage(page);
  }
}

export const test = base.extend({
  app: async ({ page }, use) => {
    await use(new App(page));
  },
});

export { expect } from "@playwright/test";