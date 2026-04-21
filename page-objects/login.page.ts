import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get emailInput(): Locator {
    return this.page.locator('[data-qa="login-email"]');
  }
  get passwordInput(): Locator {
    return this.page.locator('[data-qa="login-password"]');
  }
  get loginBtn(): Locator {
    return this.page.locator('[data-qa="login-button"]');
  }

  /**
   * Performs the login action by entering credentials and clicking the login button.
   */
  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginBtn.click();
  }
}
