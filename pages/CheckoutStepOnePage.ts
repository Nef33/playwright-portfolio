import { Page, Locator } from "@playwright/test";

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continueToPayment() {
    await this.continueButton.click();
  }
  async cancelCheckout() {
    await this.cancelButton.click();
  }
}
