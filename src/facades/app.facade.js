// src/facades/app.facade.js
import { LoginPage } from '../pages/login.page.js';
import { RegisterPage } from '../pages/register.page.js';
import { HomePage } from '../pages/home.page.js';
import { ProductPage } from '../pages/product.page.js';
import { CartPage } from '../pages/cart.page.js';

export class App {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.registerPage = new RegisterPage(page);
    this.homePage = new HomePage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
  }
}