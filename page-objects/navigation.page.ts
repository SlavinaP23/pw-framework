import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class NavigationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get productsLink(): Locator {
    return this.page.getByRole('link', { name: 'Products' });
  }
  get cartLink(): Locator {
    return this.page.getByRole('link', { name: 'Cart' });
  }
  get loginLink(): Locator {
    return this.page.getByRole('link', { name: 'Signup / Login' });
  }
  get logoutLink(): Locator {
    return this.page.getByRole('link', { name: 'Logout' });
  }

  /**
   * Navigates to the Products listing page by clicking the header link.
   */
  async goToProducts() {
    await this.productsLink.click();
  }

  /**
   * Navigates to the shopping cart page.
   */
  async goToCart() {
    await this.cartLink.click();
  }

  /**
   * Navigates to the Signup / Login page.
   */
  async goToLogin() {
    await this.loginLink.click();
  }

  /**
   * Logs the user out of the application by clicking the logout link.
   */
  async logout() {
    await this.logoutLink.click();
  }
}
