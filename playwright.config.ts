import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  globalTeardown: require.resolve('./global-teardown.ts'),
  testDir: './tests',
  timeout: 60000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [['list'], ['html', { open: 'never' }]],

  outputDir: 'test-results/',

  use: {
    baseURL: 'https://www.automationexercise.com',
    testIdAttribute: 'data-qa',

    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',

    headless: true,
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: 'e2e-chromium',
      testMatch: 'tests/e2e/checkout.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
    },

    {
      name: 'api',
      testMatch: 'tests/api/products.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
