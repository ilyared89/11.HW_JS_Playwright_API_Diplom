import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";

test.describe("UI · Search @UI @SEARCH", () => {
  test("Search for existing product returns results @SMOKE", async ({
    app,
  }) => {
    await allure.epic("demowebshop");
    await allure.feature("Search");
    await allure.story("Product search");
    await allure.severity("critical");

    await app.home.open("/");
    await app.home.search("computer");
    await expect(app.home.productGridLocator).toBeVisible();
    await app.home.attachScreenshot("Search results");
  });

  test("Search for non-existing product shows no results", async ({ app }) => {
    await app.home.open("/");
    await app.home.search("XYZ_NONEXISTENT_12345");
    await expect(app.home.noResultsLocator).toContainText(
      "No products were found",
    );
    await app.home.attachScreenshot("No results");
  });
});
