// tests/debug/find-simple-product.test.js
import { test } from '@playwright/test';

test('Find simple product for cart test', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  
  // Поиск книг — обычно без атрибутов
  await page.locator('#small-searchterms').fill('book');
  await page.locator('.search-box-button').click();
  
  // Выводим названия товаров
  const products = await page.locator('.product-item').all();
  for (let i = 0; i < Math.min(3, products.length); i++) {
    const name = await products[i].locator('.product-title a').textContent();
    console.log(`Product ${i}: ${name}`);
  }
  
  // Открываем первый и проверяем, есть ли атрибуты
  await products[0].locator('.product-title a').click();
  await page.waitForTimeout(2000);
  
  const hasSelects = await page.locator('select.product-attribute').count();
  const hasRadios = await page.locator('.product-attribute-radio').count();
  console.log(`Has selects: ${hasSelects}, Has radios: ${hasRadios}`);
  
  await page.screenshot({ path: 'debug-product-page.png', fullPage: true });
});