import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../utils/testData';

test.describe('Login', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("standard user can log in successfully @smoke @regression", async ({
    page,
  }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test("locked out user cannot log in @negative @regression", async ({
    page,
  }) => {
    await loginPage.login(users.locked.username, users.locked.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText("locked out");
  });

  test("login fails with wrong password @negative @regression", async ({
    page,
  }) => {
    await loginPage.login(users.standard.username, "wrong_password");
    await expect(loginPage.errorMessage).toBeVisible();
  });
  });
