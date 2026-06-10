import {expect } from "@playwright/test";
import {test} from "../../fixtures/fixtures";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutStepOnePage } from "../../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../../pages/CheckoutStepTwoPage";       
import { CheckoutCompletePage } from "../../pages/CheckoutCompletePage";
import { checkoutInfo, messages, products } from "../../utils/testData";


test.describe("Checkout Flow", () => {
  test.beforeEach(async ({ loggedInPage }) => {
      await expect(loggedInPage).toHaveURL(/inventory/);
    });
  test("should complete checkout", async ({ loggedInPage }) => {

    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    const checkoutStepOnePage = new CheckoutStepOnePage(loggedInPage);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(loggedInPage);
    const checkoutCompletePage = new CheckoutCompletePage(loggedInPage);

    await inventoryPage.addItemToCartByName(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillCheckoutInformation(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.zipCode);
    await checkoutStepOnePage.continueToPayment();
    await checkoutStepTwoPage.finishCheckout();

    const confirmationMessage = await checkoutCompletePage.getConfirmationMessage();
    expect(confirmationMessage).toContain(messages.orderConfirmation);
  });

  test("should cancel checkout", async ({ loggedInPage }) => {

    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    const checkoutStepOnePage = new CheckoutStepOnePage(loggedInPage);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(loggedInPage);
  
    await inventoryPage.addItemToCartByName(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillCheckoutInformation(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.zipCode);
    await checkoutStepOnePage.continueToPayment();
    await checkoutStepTwoPage.cancelCheckout();

    await expect(loggedInPage).toHaveURL(/inventory/);
 
  });
});
