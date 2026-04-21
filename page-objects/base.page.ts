import { Page, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Blocks network requests from known ad providers (Google Ads, DoubleClick)
   * to improve test stability and performance.
   */
  async handleAds() {
    await this.page.route('**/*', (route) => {
      const url = route.request().url();
      if (url.includes('googleads') || url.includes('doubleclick')) {
        route.abort();
      } else {
        route.continue();
      }
    });
  }

  /**
   * Navigates the browser to the application's root URL.
   */
  async goToHome() {
    await this.page.goto('/');
  }

  /**
   * Validates that the page title matches the expected "Automation Exercise" pattern.
   * Logs a confirmation to the console upon success.
   */
  async assertAutomationExercise() {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
    console.log('✅ UI SUCCESS: Verified "Automation Exercise" page title.');
  }
}
