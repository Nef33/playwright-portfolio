import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutStepOnePage } from "../../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../../pages/CheckoutStepTwoPage";       
import { CheckoutCompletePage } from "../../pages/CheckoutCompletePage";
import { users } from "../../utils/testData";

test.describe("Checkout Flow", () => {
  test("should complete checkout", async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
   
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillCheckoutInformation("John", "Doe", "12345");
    await checkoutStepOnePage.continueToPayment();
    await checkoutStepTwoPage.finishCheckout();

    const confirmationMessage = await checkoutCompletePage.getConfirmationMessage();
    expect(confirmationMessage).toContain("Thank you for your order!");
  });

  test("should cancel checkout", async ({ page }) => {
    // another test
  });
});
