import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.page';

/**
 * Represents the structure of payment information required for processing an order.
 * Using an interface ensures type safety and autocompletion throughout the framework.
 */
export interface PaymentData {
  name: string;
  number: string;
  cvc: string;
  month: string;
  year: string;
}

export class PaymentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get nameOnCard(): Locator {
    return this.page.locator('[data-qa="name-on-card"]');
  }
  get cardNumber(): Locator {
    return this.page.locator('[data-qa="card-number"]');
  }
  get cvc(): Locator {
    return this.page.locator('[data-qa="cvc"]');
  }
  get expiryMonth(): Locator {
    return this.page.locator('[data-qa="expiry-month"]');
  }
  get expiryYear(): Locator {
    return this.page.locator('[data-qa="expiry-year"]');
  }
  get submitBtn(): Locator {
    return this.page.locator('[data-qa="pay-button"]');
  }

  /**
   * Fills the "Name on Card" input field.
   */
  async enterName(name: string) {
    await this.nameOnCard.fill(name);
  }

  /**
   * Fills the "Card Number" input field.
   */
  async enterCardNumber(number: string) {
    await this.cardNumber.fill(number);
  }

  /**
   * Fills the "CVC" input field.
   */
  async enterCvc(cvc: string) {
    await this.cvc.fill(cvc);
  }

  /**
   * Fills the "Expiry Month" input field.
   */
  async enterExpiryMonth(month: string) {
    await this.expiryMonth.fill(month);
  }

  /**
   * Fills the "Expiry Year" input field.
   */
  async enterExpiryYear(year: string) {
    await this.expiryYear.fill(year);
  }

  /**
   * Clicks the "Pay and Confirm Order" button.
   */
  async clickPayButton() {
    await this.submitBtn.click();
  }

  /**
   * Orchestrates the filling of all payment-related input fields.
   * @param payment - An object conforming to the PaymentData interface.
   */
  async fillPaymentDetails(payment: PaymentData) {
    await this.enterName(payment.name);
    await this.enterCardNumber(payment.number);
    await this.enterCvc(payment.cvc);
    await this.enterExpiryMonth(payment.month);
    await this.enterExpiryYear(payment.year);
  }

  /**
   * Validates that the "Order Placed!" success message is visible.
   */
  async verifyOrderSuccess() {
    await expect(this.page.getByText('Order Placed!')).toBeVisible();
    console.log('✅ UI SUCCESS: Order Confirmed message is visible.');
  }

  /**
   * Complete end-to-end payment flow: fills details, submits, and verifies success.
   * @param payment - An object conforming to the PaymentData interface.
   */
  async submitPaymentAndVerify(payment: PaymentData) {
    try {
      await this.fillPaymentDetails(payment);
      await this.clickPayButton();
      await this.verifyOrderSuccess();
      console.log('✅ UI SUCCESS: Full payment flow completed.');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`❌ UI FAILURE: Payment flow failed.\n${msg}`);
      throw error;
    }
  }
}
