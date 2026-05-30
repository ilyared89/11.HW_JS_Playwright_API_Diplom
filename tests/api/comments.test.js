import { allure } from 'allure-playwright';
import { apiTest as test } from '../../src/helpers/fixtures/api.fixture.js';
import { newComment } from '../../src/helpers/builders/comment.builder.js';

test.describe('API · Comments @API @COMMENTS', () => {
  test('Gets comments by post @SMOKE @GET', async ({ commentsApi }) => {
    await allure.epic('json-server');
    await allure.feature('Comments');
    await allure.story('Get comments by post');
    await allure.severity('critical');
    await allure.owner('ilyared89');
    await allure.tag('regression');

    const res = await commentsApi.getByPost(1);
    await commentsApi.expectCommentsFound(res);
  });

  test('Creates comment for post @POST', async ({ commentsApi }) => {
    await allure.epic('json-server');
    await allure.feature('Comments');
    await allure.story('Create comment');
    await allure.severity('normal');
    await allure.owner('ilyared89');

    const comment = newComment();
    const res = await commentsApi.create(1, comment);
    await commentsApi.expectCommentCreated(res, comment);
  });
});
