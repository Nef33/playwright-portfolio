import { test } from "../../fixtures/fixtures";
import { expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { products } from "../../utils/testData";



test.describe("Cart", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  test.beforeEach(async ({ loggedInPage }) => {
    await expect(loggedInPage).toHaveURL(/inventory/);
    inventoryPage = new InventoryPage(loggedInPage);
    cartPage = new CartPage(loggedInPage);
  });

  test("can add a single item to cart", async ({ loggedInPage }) => {
  
    await inventoryPage.addItemToCartByName(products.backpack);
    const count = await inventoryPage.getCartCount();
    expect(count).toBe("1");
  });

  test("can add multiple items to cart", async ({ loggedInPage }) => {
    await inventoryPage.addItemToCartByName(products.backpack);
    await inventoryPage.addItemToCartByName(products.bikeLight);
    const count = await inventoryPage.getCartCount();
    expect(count).toBe("2");
  });

  test("cart contains correct items after adding", async ({ loggedInPage }) => {

    await inventoryPage.addItemToCartByName(products.backpack);
    await inventoryPage.goToCart();

    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain(products.backpack);
  });

  test("can remove item from cart", async ({ loggedInPage }) => {

    await inventoryPage.addItemToCartByName(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.removeItem(products.backpack);

    const itemCount = await cartPage.cartItems.count();
    expect(itemCount).toBe(0);
  });
});
