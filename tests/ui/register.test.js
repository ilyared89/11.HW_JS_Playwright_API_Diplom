// tests/ui/register.test.js
import { allure } from "allure-playwright";
import { test, expect } from "../../src/helpers/fixtures/ui.fixture.js";
import { UserBuilder } from "../../src/helpers/builders/index.js";

test("Successful registration", async ({ app }) => {
  const user = new UserBuilder()
    .addFirstName()
    .addLastName()
    .addEmail()
    .addPassword()
    .build();

  await app.registerPage.open(); // теперь open() без параметров
  await app.registerPage.register(user);

  await expect(app.registerPage.successMessageLocator).toBeVisible();
});
