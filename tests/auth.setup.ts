import { test as setup, expect } from '@playwright/test';
import { PageManager } from '@pages/page-manager.page';
import { testData } from '@data/test-data';

const authFile = '.auth/user.json';

/**
 * Global authentication setup.
 * Performs login via UI, verifies session success, and persists the
 * browser storage state to a JSON file for reuse in subsequent tests.
 */
setup('authenticate', async ({ page, request }) => {
  const pm = new PageManager(page, request);

  console.log(`🔐 Setup: Logging in as ${testData.user.email}`);

  await page.goto('/login');
  await pm.onLoginPage().login(testData.user.email, testData.user.password);

  await expect(page.locator('a[href="/logout"]')).toBeVisible({ timeout: 10000 });

  console.log('✅ Setup: Login successful, saving state...');
  await page.context().storageState({ path: authFile });
});
