// tests/api/comments.test.js 
import { test, expect } from "../../src/helpers/fixtures/api.fixture.js";
import { PostBuilder, CommentBuilder } from "../../src/helpers/builders/index.js";
import { faker } from "@faker-js/faker";

test("Creates comment for post", async ({ api }) => {
  // ✅ ШАГ 1: Создаём пост (изоляция теста!)
  const post = new PostBuilder()
    .withTitle(faker.lorem.sentence())
    .withBody(faker.lorem.paragraph())
    .withUserId(faker.number.int({ min: 1, max: 10 }))
    .build();
  
  const createPostRes = await api.posts.create(post);
  const postId = (await createPostRes.json()).id;  

  // ✅ ШАГ 2: Создаём комментарий для этого поста
  const comment = new CommentBuilder()
    .withName(faker.person.fullName())
    .withEmail(faker.internet.email())
    .withBody(faker.lorem.paragraph())
    .build();

  const res = await api.comments.create(postId, comment);
  const body = await res.json();

  // ✅ ШАГ 3: Проверяем все поля
  expect(res.status()).toBe(201);
  expect(body).toHaveProperty("name", comment.name);
  expect(body).toHaveProperty("email", comment.email);
  expect(body).toHaveProperty("body", comment.body);
  expect(body).toHaveProperty("id");
  
  // ✅ ШАГ 4: Проверяем postId (json-server возвращает его как строку или число)
  expect(String(body.postId)).toBe(String(postId));
});

test("Gets comments by post", async ({ api }) => {
  // ✅ ШАГ 1: Создаём пост
  const post = new PostBuilder()
    .withTitle(faker.lorem.sentence())
    .withBody(faker.lorem.paragraph())
    .withUserId(1)
    .build();
  
  const createPostRes = await api.posts.create(post);
  const postId = (await createPostRes.json()).id;

  // ✅ ШАГ 2: Создаём 2 комментария для этого поста
  const comment1 = new CommentBuilder()
    .withName("User One")
    .withEmail("user1@test.com")
    .withBody("First comment")
    .build();
  
  const comment2 = new CommentBuilder()
    .withName("User Two")
    .withEmail("user2@test.com")
    .withBody("Second comment")
    .build();

  await api.comments.create(postId, comment1);
  await api.comments.create(postId, comment2);

  // ✅ ШАГ 3: Получаем комментарии
  const res = await api.comments.getByPost(postId);
  const body = await res.json();

  expect(res.status()).toBe(200);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThanOrEqual(2);  // ✅ Минимум 2 комментария

  // ✅ ШАГ 4: Проверяем, что все комментарии принадлежат нашему посту
  body.forEach((comment) => {
    expect(String(comment.postId)).toBe(String(postId));
  });
});