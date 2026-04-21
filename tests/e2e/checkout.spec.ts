import { test } from '@fixtures';
import { testData } from '@data/test-data';

test.describe('E2E: Checkout Flow', () => {
  test('Complete Checkout Process @e2e', async ({ pm }) => {
    await pm.navigateTo().handleAds();
    await pm.navigateTo().goToHome();
    await pm.navigateTo().assertAutomationExercise();
    await pm.navigateTo().goToProducts();
    await pm.onProductsPage().addMultipleProducts(2);
    await pm.navigateTo().goToCart();
    await pm.onCartPage().proceedToCheckout();
    await pm.onCheckoutPage().verifyAddressDetails(testData.user);
    await pm.onCheckoutPage().enterComment(testData.orderComment);
    await pm.onCheckoutPage().clickPlaceOrder();
    await pm.onPaymentPage().submitPaymentAndVerify(testData.payment);
    await pm.onCheckoutPage().verifyOrderSuccess();
    await pm.onCheckoutPage().assertDownloadInvoiceEnabled();
    await pm.onCheckoutPage().clickContinue();
  });
});
