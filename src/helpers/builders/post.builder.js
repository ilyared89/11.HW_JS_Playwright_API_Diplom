import { faker } from '@faker-js/faker';

export class PostBuilder {
  constructor() {
    this.post = {
      title: faker.lorem.sentence(3),
      body: faker.lorem.paragraph(2),
      userId: faker.number.int({ min: 1, max: 10 }),
    };
  }

  withTitle(value) { this.post.title = value; return this; }
  withBody(value) { this.post.body = value; return this; }
  withUserId(value) { this.post.userId = value; return this; }

  build() {
    return { ...this.post };
  }
}

export const newPost = () => new PostBuilder().build();
