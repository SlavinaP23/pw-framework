import { APIRequestContext, expect } from '@playwright/test';

interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: {
    usertype: { usertype: string };
    category: string;
  };
}

export class ProductsApi {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Retrieves the full product list via API and validates that each product
   * object conforms to the expected data types and structure.
   */
  async getAllProductsAndVerifyMapping() {
    try {
      const res = await this.request.get('/api/productsList');
      const body = await res.json();

      expect(res.status()).toBe(200);
      expect(body.responseCode).toBe(200);

      expect(Array.isArray(body.products), 'API response should contain a products array').toBe(
        true,
      );

      console.log(
        `📡 API: Fetched ${body.products.length} products. Starting data mapping check...`,
      );

      body.products.forEach((product: Product) => {
        expect.soft(typeof product.id, `ID for ${product.name} should be a number`).toBe('number');

        expect
          .soft(Number.isInteger(product.id), `ID ${product.id} should be an integer`)
          .toBe(true);

        expect
          .soft(typeof product.name, `Name for ID ${product.id} should be a string`)
          .toBe('string');
        expect
          .soft(typeof product.price, `Price for ID ${product.id} should be a string`)
          .toBe('string');
        expect
          .soft(typeof product.brand, `Brand for ID ${product.id} should be a string`)
          .toBe('string');
      });

      console.log(`✅ API SUCCESS: All ${body.products.length} product data types verified.`);
      return body.products as Product[];
    } catch (error) {
      console.error(`❌ API FAILURE: Error during products list retrieval or mapping:`, error);
      throw error;
    }
  }

  /**
   * Searches for products using a POST request and verifies the search logic
   * based on the provided term.
   */
  async searchAndVerify(term: string) {
    try {
      console.log(`📡 API: Searching for product term: "${term}"`);

      const res = await this.request.post('/api/searchProduct', {
        form: { search_product: term },
      });
      const body = await res.json();

      expect(body.responseCode).toBe(200);
      expect(Array.isArray(body.products)).toBe(true);

      if (term === 'top') {
        expect(body.products.length).toBeGreaterThan(0);
        console.log(`✅ API SUCCESS: Found ${body.products.length} results for "${term}"`);
      } else {
        expect(body.products).toHaveLength(0);
        console.log(`✅ API SUCCESS: Verified 0 results for non-existent term "${term}"`);
      }
    } catch (error) {
      console.error(`❌ API FAILURE: Search request failed for term "${term}":`, error);
      throw error;
    }
  }
}
