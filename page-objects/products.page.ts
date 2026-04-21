import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get searchInput(): Locator {
    return this.page.locator('#search_product');
  }
  get searchBtn(): Locator {
    return this.page.locator('#submit_search');
  }
  get productCards(): Locator {
    return this.page.locator('.single-products');
  }
  get productNames(): Locator {
    return this.page.locator('.productinfo p');
  }
  get continueBtn(): Locator {
    return this.page.locator('button.btn-success:has-text("Continue Shopping")');
  }
  get viewProductButtons(): Locator {
    return this.page.locator('.choose a');
  }

  /**
   * Iterates through the product list and adds a specified number of items to the cart.
   * Handles scrolling and the "Continue Shopping" modal between additions.
   */
  async addMultipleProducts(count: number) {
    console.log(`🛒 UI: Attempting to add ${count} products to the cart...`);
    try {
      for (let i = 0; i < count; i++) {
        const product = this.productCards.nth(i);
        await product.scrollIntoViewIfNeeded();

        await product.locator('.productinfo a.add-to-cart').click({ force: true });

        await this.continueBtn.click();
        console.log(`   ➕ Product ${i + 1} added.`);
      }
      console.log(`✅ UI SUCCESS: Successfully added ${count} products to cart.`);
    } catch (error) {
      console.error(`❌ UI FAILURE: Failed to add products at index ${count}. Error:`, error);
      throw error;
    }
  }

  /**
   * Executes a product search and asserts that all returned items contain the keyword.
   */
  async searchAndVerifyProducts(keyword: string) {
    console.log(`🔍 UI: Searching for products with keyword: "${keyword}"`);
    try {
      await this.searchInput.fill(keyword);
      await this.searchBtn.click();

      const names = await this.productNames.allTextContents();

      expect(names.length).toBeGreaterThan(0);

      for (const name of names) {
        expect(name.toLowerCase()).toContain(keyword.toLowerCase());
      }

      console.log(`✅ UI SUCCESS: Found ${names.length} products matching "${keyword}".`);
    } catch (error) {
      console.error(`❌ UI FAILURE: Search or verification failed for "${keyword}". Error:`, error);
      throw error;
    }
  }

  /**
   * Navigates to the first product's detail page and validates the product name matches the search keyword.
   */
  async viewDetailsAndVerify(keyword: string) {
    console.log(`👁️ UI: Viewing product details for first result matching "${keyword}"`);
    try {
      await this.viewProductButtons.first().click();
      await expect(this.page).toHaveURL(/product_details/);

      const detailName = await this.page.locator('.product-information h2').innerText();
      expect(detailName.toLowerCase()).toContain(keyword.toLowerCase());

      console.log(`✅ UI SUCCESS: Details verified for product: "${detailName}"`);
    } catch (error) {
      console.error(`❌ UI FAILURE: Could not verify product details. Error:`, error);
      throw error;
    }
  }
}
