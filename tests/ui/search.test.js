import { allure } from "allure-playwright";
// tests/ui/search.test.js — замени полностью
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";

test("Search returns results", async ({ app }) => {
  await app.homePage.open("/");
  await app.homePage.search("book");

  // Проверяем, что результаты есть (не конкретное количество)
  const count = await app.homePage.searchResults.count();
  expect(count).toBeGreaterThan(0);

  // Или проверяем видимость первого результата
  await expect(app.homePage.searchResults.first()).toBeVisible();
});

test("Search with no results", async ({ app }) => {
  await app.homePage.open("/");
  await app.homePage.search("xyznonexistent12345");

  await expect(app.homePage.noResultsMessage).toBeVisible();
});
