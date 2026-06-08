import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly orderConfirmationMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderConfirmationMessage = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async getConfirmationMessage() {
    return await this.orderConfirmationMessage.textContent();
  }

  async goBackHome() {
    await this.backHomeButton.click();
  }
}