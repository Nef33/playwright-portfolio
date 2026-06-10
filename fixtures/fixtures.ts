import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../utils/testData";

type MyFixtures = {
  loggedInPage: Page;
};

export const test = base.extend<MyFixtures>({

  loggedInPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
     await loginPage.login(users.standard.username, users.standard.password);
    await use(page);

  },
});
