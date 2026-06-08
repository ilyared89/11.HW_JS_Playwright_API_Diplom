# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/login.test.js >> UI · Authentication @UI @AUTH >> Successful login with valid credentials @SMOKE
- Location: tests/ui/login.test.js:13:3

# Error details

```
Error: DEMO_EMAIL and DEMO_PASSWORD must be set in environment variables
```

# Test source

```ts
  1  | import { allure } from "allure-playwright";
  2  | import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";
  3  | 
  4  | test.describe("UI · Authentication @UI @AUTH", () => {
  5  |   test.beforeAll(() => {
  6  |     if (!process.env.DEMO_EMAIL || !process.env.DEMO_PASSWORD) {
> 7  |       throw new Error(
     |             ^ Error: DEMO_EMAIL and DEMO_PASSWORD must be set in environment variables
  8  |         "DEMO_EMAIL and DEMO_PASSWORD must be set in environment variables",
  9  |       );
  10 |     }
  11 |   });
  12 | 
  13 |   test("Successful login with valid credentials @SMOKE", async ({ app }) => {
  14 |     await allure.epic("demowebshop");
  15 |     await allure.feature("Authentication");
  16 |     await allure.story("Login");
  17 |     await allure.severity("blocker");
  18 | 
  19 |     await app.login.open("/login");
  20 |     await app.login.login(process.env.DEMO_EMAIL, process.env.DEMO_PASSWORD);
  21 |     await expect(app.login.accountHeaderLocator).toBeVisible();
  22 |     await app.login.attachScreenshot("Login success");
  23 |   });
  24 | });
  25 | 
```