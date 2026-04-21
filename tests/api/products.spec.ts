import { test } from '@fixtures';
import { testData } from '@data/test-data';

test.describe('API: Product Suite @api', () => {
  /**
   * Validates the full product list and ensures the schema mapping
   * matches our internal TypeScript interfaces.
   */
  test('Get All Products List and Verify Data Mapping', async ({ pm }) => {
    await pm.onProductsApi().getAllProductsAndVerifyMapping();
  });

  /**
   * Verifies the search API logic using multiple search terms
   * defined in our centralized test data.
   */
  test('POST Search API - Scenarios', async ({ pm }) => {
    const searchTerms = testData.api.searchTerms;

    for (const term of searchTerms) {
      await pm.onProductsApi().searchAndVerify(term);
    }
  });
});
