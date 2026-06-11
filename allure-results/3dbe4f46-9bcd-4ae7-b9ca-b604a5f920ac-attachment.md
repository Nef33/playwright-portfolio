# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout/checkout.spec.ts >> Checkout >> should complete checkout
- Location: tests/checkout/checkout.spec.ts:29:7

# Error details

```
TypeError: received is not iterable
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
      - generic [ref=e15]: "Checkout: Complete!"
    - generic [ref=e16]:
      - img "Pony Express" [ref=e17]
      - heading "Thank you for your order!" [level=2] [ref=e18]
      - generic [ref=e19]: Your order has been dispatched, and will arrive just as fast as the pony can get there!
      - button "Back Home" [ref=e20] [cursor=pointer]
  - contentinfo [ref=e21]:
    - list [ref=e22]:
      - listitem [ref=e23]:
        - link "Twitter" [ref=e24] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e25]:
        - link "Facebook" [ref=e26] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e27]:
        - link "LinkedIn" [ref=e28] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e29]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import {expect } from "@playwright/test";
  2  | import {test} from "../../fixtures/fixtures";
  3  | import { InventoryPage } from "../../pages/InventoryPage";
  4  | import { CartPage } from "../../pages/CartPage";
  5  | import { CheckoutStepOnePage } from "../../pages/CheckoutStepOnePage";
  6  | import { CheckoutStepTwoPage } from "../../pages/CheckoutStepTwoPage";       
  7  | import { CheckoutCompletePage } from "../../pages/CheckoutCompletePage";
  8  | import { checkoutInfo, messages, products } from "../../utils/testData";
  9  | 
  10 | 
  11 | 
  12 | test.describe("Checkout", () => {
  13 |   let inventoryPage: InventoryPage;
  14 |   let cartPage: CartPage;
  15 |   let checkoutStepOnePage: CheckoutStepOnePage;
  16 |   let checkoutStepTwoPage: CheckoutStepTwoPage;
  17 |   let checkoutCompletePage: CheckoutCompletePage;
  18 | 
  19 |   test.beforeEach(async ({ loggedInPage }) => {
  20 |       await expect(loggedInPage).toHaveURL(/inventory/);
  21 |       inventoryPage = new InventoryPage(loggedInPage);
  22 |       cartPage = new CartPage(loggedInPage);
  23 |       checkoutStepOnePage = new CheckoutStepOnePage(loggedInPage);
  24 |       checkoutStepTwoPage = new CheckoutStepTwoPage(loggedInPage);
  25 |       checkoutCompletePage = new CheckoutCompletePage(loggedInPage);
  26 |     });
  27 |    
  28 |   
  29 |   test("should complete checkout", async ({ loggedInPage }) => {
  30 | 
  31 | 
  32 |     await inventoryPage.addItemToCartByName(products.backpack);
  33 |     await inventoryPage.goToCart();
  34 |     await cartPage.proceedToCheckout();
  35 |     await checkoutStepOnePage.fillCheckoutInformation(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.zipCode);
  36 |     await checkoutStepOnePage.continueToPayment();
  37 |     await checkoutStepTwoPage.finishCheckout();
> 38 |     await expect(checkoutCompletePage.getConfirmationMessage()).toContain(messages.orderConfirmation);
     |                                                                 ^ TypeError: received is not iterable
  39 |   });
  40 |     
  41 |   test("should cancel checkout", async ({ loggedInPage }) => {
  42 | 
  43 |     // pages are initialized in beforeEach, so we can directly use them here
  44 |    
  45 |   
  46 |     await inventoryPage.addItemToCartByName(products.backpack);
  47 |     await inventoryPage.goToCart();
  48 |     await cartPage.proceedToCheckout();
  49 |     await checkoutStepOnePage.fillCheckoutInformation(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.zipCode);
  50 |     await checkoutStepOnePage.continueToPayment();
  51 |     await checkoutStepTwoPage.cancelCheckout();
  52 | 
  53 |     await expect(loggedInPage).toHaveURL(/inventory/);
  54 |  
  55 |   });
  56 |     
  57 |  
  58 |   });
  59 | 
  60 | 
```