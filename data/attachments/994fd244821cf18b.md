# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/posts-update.test.js >> API · Posts Update @API @POSTS >> Partially updates post with PATCH @PATCH
- Location: tests/api/posts-update.test.js:20:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1  | import { allure } from 'allure-playwright';
  2  | import { apiTest as test, expect } from '../../src/helpers/fixtures/api.fixture.js';
  3  | import { newPost } from '../../src/helpers/builders/post.builder.js';
  4  | 
  5  | test.describe('API · Posts Update @API @POSTS', () => {
  6  |   test('Updates post with PUT @SMOKE @PUT', async ({ postsApi }) => {
  7  |     await allure.epic('json-server');
  8  |     await allure.feature('Posts');
  9  |     await allure.story('Update post');
  10 |     await allure.severity('critical');
  11 |     await allure.owner('ilyared89');
  12 |     await allure.tag('regression');
  13 | 
  14 |     const post = newPost();
  15 |     const res = await postsApi.update(1, post);
  16 |     await postsApi.expectStatus(res, 200);
  17 |     await postsApi.expectPostUpdated(res, post.title);
  18 |   });
  19 | 
  20 |   test('Partially updates post with PATCH @PATCH', async ({ postsApi }) => {
  21 |     await allure.epic('json-server');
  22 |     await allure.feature('Posts');
  23 |     await allure.story('Partial update post');
  24 |     await allure.severity('normal');
  25 |     await allure.owner('ilyared89');
  26 | 
  27 |     const payload = { title: 'Updated Title' };
  28 |     const res = await postsApi.patch(1, payload);
> 29 |     expect(res.status()).toBe(200);
     |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  30 |     const body = await res.json();
  31 |     expect(body.title).toBe(payload.title);
  32 |   });
  33 | });
  34 | 
```