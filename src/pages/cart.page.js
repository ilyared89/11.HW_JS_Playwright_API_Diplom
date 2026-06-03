import { allure } from 'allure-playwright';
import { BasePage } from './base.page.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart-item-row');
    this.productNameInCart = page.locator('.product-name');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.updateCartButton = page.getByRole('button', { name: 'Update shopping cart' });
    this.emptyCartMessage = page.getByText('Your Shopping Cart is empty!');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async removeFirstItem() {
    await allure.step('Remove first item from cart', async () => {
      await this.removeButton.first().click();
      await this.updateCartButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  get emptyCartMessageLocator() { return this.emptyCartMessage; }
  get productNameLocator() { return this.productNameInCart; }
  get cartItemsLocator() { return this.cartItems; }
}