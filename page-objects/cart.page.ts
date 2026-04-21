import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * The "Proceed To Checkout" button locator identified by its text content.
   */
  get proceedToCheckoutBtn(): Locator {
    return this.page.getByText('Proceed To Checkout');
  }

  /**
   * Clicks the "Proceed To Checkout" button to navigate to the checkout details page.
   */
  async proceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }
}
