import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.inventory_item');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addItemToCartByName(productName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: productName });
    await item.locator('button').click();
  }

  async removeItemFromCartByName(productName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: productName });
    await item.locator('button').click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getCartCount(): Promise<string | null> {
    return await this.cartBadge.textContent();
  }
}