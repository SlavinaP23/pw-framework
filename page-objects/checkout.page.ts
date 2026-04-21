import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get deliveryAddress(): Locator {
    return this.page.locator('#address_delivery');
  }
  get billingAddress(): Locator {
    return this.page.locator('#address_invoice');
  }
  get commentArea(): Locator {
    return this.page.locator('textarea[name="message"]');
  }
  get placeOrderBtn(): Locator {
    return this.page.locator('a[href="/payment"]');
  }
  get successMessage() {
    return this.page.getByText('Congratulations! Your order has been confirmed!');
  }
  get downloadInvoiceBtn() {
    return this.page.getByRole('link', { name: 'Download Invoice' });
  }
  get continueBtn() {
    return this.page.getByTestId('continue-button');
  }

  /**
   * Compares the UI delivery address against the provided user data.
   */
  async verifyAddressDetails(user: any) {
    const actualAddress = await this.deliveryAddress.innerText();

    const expectedData = {
      firstName: String(user.firstName || ''),
      lastName: String(user.lastName || ''),
      address: String(user.address || ''),
      city: String(user.city || ''),
      state: String(user.state || ''),
    };

    try {
      expect(actualAddress).toContain(expectedData.firstName);
      expect(actualAddress).toContain(expectedData.lastName);
      expect(actualAddress).toContain(expectedData.address);

      console.log(`✅ UI SUCCESS: Address details for ${expectedData.firstName} verified.`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`❌ UI FAILURE: Address verification failed. Error: ${msg}`);
      throw error;
    }
  }

  /**
   * Input a message into the order comment text area.
   */
  async enterComment(comment: string) {
    await this.commentArea.fill(comment || 'Default Order Comment');
  }

  /**
   * Proceeds to the payment page by clicking the place order button.
   */
  async clickPlaceOrder() {
    await this.placeOrderBtn.click();
  }

  /**
   * Finalizes the flow by clicking the continue button on the success screen.
   */
  async clickContinue() {
    await this.continueBtn.click();
  }

  /**
   * Performs a dual assertion for the success message and invoice availability.
   */
  async verifyOrderSuccess() {
    try {
      await expect(this.successMessage).toBeVisible();
      await expect(this.downloadInvoiceBtn).toBeVisible();
      console.log('✅ SUCCESS: Order confirmation message and invoice button are visible.');
    } catch (error) {
      console.error('❌ FAILURE: Order confirmation elements were not found on the page.');
      throw error;
    }
  }

  /**
   * Confirms that the invoice download link is active and enabled.
   */
  async assertDownloadInvoiceEnabled() {
    await expect(this.downloadInvoiceBtn).toBeEnabled();
  }
}
