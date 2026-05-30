import { allure } from 'allure-playwright';
import { test } from '../../src/helpers/fixtures/ui.fixture.js';

test.describe('UI · Search @UI @SEARCH', () => {
  test('Search for existing product returns results @SMOKE', async ({ homePage }) => {
    await allure.epic('demowebshop');
    await allure.feature('Search');
    await allure.story('Product search');
    await allure.severity('critical');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    await homePage.open('/');
    await homePage.search('computer');
    await homePage.expectSearchResultsVisible();
  });

  test('Search for non-existing product shows no results', async ({ homePage }) => {
    await allure.epic('demowebshop');
    await allure.feature('Search');
    await allure.story('No results search');
    await allure.severity('minor');
    await allure.owner('ilyared89');

    await homePage.open('/');
    await homePage.search('XYZ_NONEXISTENT_12345');
    await homePage.expectNoResults();
  });
});
