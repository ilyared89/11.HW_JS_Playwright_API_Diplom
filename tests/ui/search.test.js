import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";

test.describe("UI · Search @UI @SEARCH", () => {
  test("Search for existing product returns results @SMOKE", async ({
    homePage,
  }) => {
    await allure.epic("demowebshop");
    await allure.feature("Search");
    await allure.story("Product search");
    await allure.severity("critical");

    await homePage.open("/");
    await homePage.search("computer");
    await expect(homePage.productGridLocator).toBeVisible();
    await homePage.attachScreenshot("Search results");
  });

  test("Search for non-existing product shows no results", async ({
    homePage,
  }) => {
    await homePage.open("/");
    await homePage.search("XYZ_NONEXISTENT_12345");
    await expect(homePage.noResultsLocator).toContainText(
      "No products were found",
    );
    await homePage.attachScreenshot("No results");
  });
});
