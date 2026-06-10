import { test } from "../../fixtures/fixtures";
import { expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";



test.describe("Cart", () => {
  test.beforeEach(async ({ loggedInPage }) => {
    await expect(loggedInPage).toHaveURL(/inventory/);
  });

  test("can add a single item to cart", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
    const count = await inventoryPage.getCartCount();
    expect(count).toBe("1");
  });

  test("can add multiple items to cart", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
    await inventoryPage.addItemToCartByName("Sauce Labs Bike Light");
    const count = await inventoryPage.getCartCount();
    expect(count).toBe("2");
  });

  test("cart contains correct items after adding", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
    await inventoryPage.goToCart();

    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain("Sauce Labs Backpack");
  });

  test("can remove item from cart", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await cartPage.removeItem("Sauce Labs Backpack");

    const itemCount = await cartPage.cartItems.count();
    expect(itemCount).toBe(0);
  });
});
