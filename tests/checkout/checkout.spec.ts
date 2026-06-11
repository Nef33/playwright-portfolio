import {expect } from "@playwright/test";
import {test} from "../../fixtures/fixtures";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutStepOnePage } from "../../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../../pages/CheckoutStepTwoPage";       
import { CheckoutCompletePage } from "../../pages/CheckoutCompletePage";
import { checkoutInfo, messages, products } from "../../utils/testData";



test.describe("Checkout", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ loggedInPage }) => {
      await expect(loggedInPage).toHaveURL(/inventory/);
      inventoryPage = new InventoryPage(loggedInPage);
      cartPage = new CartPage(loggedInPage);
      checkoutStepOnePage = new CheckoutStepOnePage(loggedInPage);
      checkoutStepTwoPage = new CheckoutStepTwoPage(loggedInPage);
      checkoutCompletePage = new CheckoutCompletePage(loggedInPage);
    });
   
  
  test("should complete checkout", async ({ loggedInPage }) => {


    await inventoryPage.addItemToCartByName(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillCheckoutInformation(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.zipCode);
    await checkoutStepOnePage.continueToPayment();
    await checkoutStepTwoPage.finishCheckout();
   expect( await checkoutCompletePage.getConfirmationMessage()).toContain(messages.orderConfirmation);
  });
    
  test("should cancel checkout", async ({ loggedInPage }) => {

    // pages are initialized in beforeEach, so we can directly use them here
   
  
    await inventoryPage.addItemToCartByName(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillCheckoutInformation(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.zipCode);
    await checkoutStepOnePage.continueToPayment();
    await checkoutStepTwoPage.cancelCheckout();

    await expect(loggedInPage).toHaveURL(/inventory/);
 
  });
  test("should show error for missing checkout information", async ({ loggedInPage }) => {

    await inventoryPage.addItemToCartByName(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    // Leave all fields empty and try to continue
    await checkoutStepOnePage.continueToPayment();

    const errorMessage = await checkoutStepOnePage.errorMessage.textContent();
    expect(errorMessage).toContain(messages.checkoutError);
    
 
  });

});