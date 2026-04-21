# Playwright POM Framework 🚀

A professional E2E and API automation framework built for the [Automation Exercise](https://www.automationexercise.com/) platform. This project demonstrates a scalable, maintainable, and "clean-room" architectural approach to modern quality engineering.

## 🏗️ Architecture & Best Practices

This framework implements several industry-standard patterns to ensure stability, speed, and developer productivity:

- **Page Object Model (POM):** Encapsulated locators and actions within dedicated classes to keep tests readable and easy to maintain.
- **Centralized Page Management:** Uses a `PageManager` class to handle class instantiation, preventing code bloat and providing a clean API for test scripts.
- **Atomic Action Pattern:** Form interactions are broken down into granular, reusable methods (e.g., `enterCardNumber`, `clickPayButton`). This allows for maximum flexibility in both "happy path" and negative testing scenarios.
- **Developer Experience (DX):** Comprehensive JSDoc documentation across all Page Objects to provide instant IntelliSense guidance and clear method descriptions within the IDE.
- **Hybrid Testing (E2E + API):** Combines UI journey testing with API validation (verifying product data mapping and search logic) for full-stack coverage.
- **Custom Fixtures:** Extends Playwright’s base test to inject the `PageManager` (`pm`) automatically, reducing boilerplate in every spec file.
- **Global Authentication:** Implements `auth.setup.ts` to log in once and reuse the authentication state (`user.json`), cutting total execution time significantly.
- **Smart Network Interception:** Includes a custom ad-blocker via `page.route` to eliminate third-party flakiness and speed up page loads.
- **CI/CD Integration:** Fully configured GitHub Actions workflow with encrypted secret management and automated HTML reporting.
- **Logical Test Grouping:** Uses `test.step` to create clear, collapsible "chapters" in reports, making debugging significantly faster.

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Test Runner:** Playwright
- **CI/CD:** GitHub Actions
- **Data Management:** Dotenv for environment variable security

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm

### Installation

1. Clone the repo:

   ```bash
   git clone [https://github.com/SlavinaP23/pw-framework.git](https://github.com/SlavinaP23/pw-framework.git)

   ```

2. Install dependencies:

   ```bash
    npm install

   ```

3. Install Playwright Browsers:
   ```bash
    npx playwright install
   ```

### Environment Setup

Create a .env file in the root directory and add your test credentials (this file is ignored by Git for security):

- USER_EMAIL=your_test_email@example.com
- USER_PASSWORD=your_password
- CARD_NUMBER=your_card_number
- CVC=your_card_cvc

### Running Tests

You can run tests using the Playwright CLI or the scripts defined in package.json.

### Script-Based Execution (Recommended)

- Run all tests: npm test
- Run E2E Checkout Flow only: npm run test:e2e
- Run API Mapping tests only: npm run test:api
- Run tests by tags: npx playwright test --grep @e2e // npx playwright test --grep @api

### Debugging & Visualization

- Headed Mode: npx playwright test --headed
- Debug Mode: npx playwright test --debug
- View HTML Report: npm run report

### Reporting & CI/CD

This project is integrated with GitHub Actions. On every push to main, the suite executes in a headless Linux environment.
Artifacts: HTML reports are uploaded to the Action run and retained for 30 days.
Secrets: Credentials are managed via GitHub Encrypted Secrets to ensure zero exposure.
