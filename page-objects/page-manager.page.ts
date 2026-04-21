import { Page, APIRequestContext } from '@playwright/test';
import { NavigationPage } from '@pages/navigation.page';
import { LoginPage } from '@pages/login.page';
import { ProductsPage } from '@pages/products.page';
import { CartPage } from '@pages/cart.page';
import { CheckoutPage } from '@pages/checkout.page';
import { PaymentPage } from '@pages/payment.page';
import { ProductsApi } from '@api/products-api';

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly loginPage: LoginPage;
  private readonly productsPage: ProductsPage;
  private readonly cartPage: CartPage;
  private readonly checkoutPage: CheckoutPage;
  private readonly paymentPage: PaymentPage;
  private readonly productsApi: ProductsApi;

  constructor(page: Page, request: APIRequestContext) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.productsPage = new ProductsPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.paymentPage = new PaymentPage(this.page);
    this.productsApi = new ProductsApi(request);
  }

  /**
   * Access methods for main site navigation and common header actions.
   */
  navigateTo() {
    return this.navigationPage;
  }

  /**
   * Access methods for user authentication and the login/signup screen.
   */
  onLoginPage() {
    return this.loginPage;
  }

  /**
   * Access methods for browsing products and adding items to the cart.
   */
  onProductsPage() {
    return this.productsPage;
  }

  /**
   * Access methods for viewing the shopping cart and managing item quantities.
   */
  onCartPage() {
    return this.cartPage;
  }

  /**
   * Access methods for address verification, order comments, and order placement.
   */
  onCheckoutPage() {
    return this.checkoutPage;
  }

  /**
   * Access methods for payment processing and card details entry.
   */
  onPaymentPage() {
    return this.paymentPage;
  }

  /**
   * Access methods for interacting with product-related API endpoints.
   */
  onProductsApi() {
    return this.productsApi;
  }
}
