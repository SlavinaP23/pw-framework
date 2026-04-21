import { test as base } from '@playwright/test';
import { PageManager } from '@pages/page-manager.page';

/**
 * Custom Playwright test fixture that extends the base test.
 * Automatically initializes and provides the PageManager (pm) instance
 * to be used within test specs, eliminating the need for manual setup in each test.
 */
export const test = base.extend<{ pm: PageManager }>({
  pm: async ({ page, request }, use) => {
    const pm = new PageManager(page, request);

    await use(pm);
  },
});

export { expect } from '@playwright/test';
