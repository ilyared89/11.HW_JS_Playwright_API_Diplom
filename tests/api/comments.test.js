import { allure } from 'allure-playwright';
import { apiTest as test, expect } from '../../src/helpers/fixtures/api.fixture.js';
import { CommentBuilder } from '../../src/helpers/builders/index.js';

test.describe('API · Comments @API @COMMENTS', () => {
  test('Gets comments by post @SMOKE @GET', async ({ api }) => {
    await allure.epic('json-server');
    await allure.feature('Comments');
    await allure.story('Get comments by post');
    await allure.severity('critical');

    const res = await api.comments.getByPost(1);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('Creates comment for post @POST', async ({ api }) => {
    await allure.epic('json-server');
    await allure.feature('Comments');
    await allure.story('Create comment');
    await allure.severity('normal');

    const comment = new CommentBuilder().addName().addEmail().addBody().build();
    const postId = 1;
    const res = await api.comments.create(postId, comment);
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.name).toBe(comment.name);
    expect(body.email).toBe(comment.email);
    expect(body.body).toBe(comment.body);
    expect(body.postId).toBe(postId);   
    expect(body.id).toBeDefined();
  });
});