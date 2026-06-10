
import {expect } from "@playwright/test";
import {test} from "../../fixtures/fixtures";

test.describe("Visual Regression", () => {  
    test("inventory page matches screenshot", async ({ loggedInPage }) => {
        await expect(loggedInPage).toHaveScreenshot("inventory.png");
      });
});



 
