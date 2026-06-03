import { faker } from '@faker-js/faker';

export class PostBuilder {
  constructor() {
    this.post = {};
  }

  addTitle() {
    this.post.title = faker.lorem.sentence(3);
    return this;
  }

  addBody() {
    this.post.body = faker.lorem.paragraph(2);
    return this;
  }

  addUserId() {
    this.post.userId = faker.number.int({ min: 1, max: 10 });
    return this;
  }

  withTitle(value) { this.post.title = value; return this; }
  withBody(value) { this.post.body = value; return this; }
  withUserId(value) { this.post.userId = value; return this; }

  build() {
    if (!this.post.title) this.addTitle();
    if (!this.post.body) this.addBody();
    if (!this.post.userId) this.addUserId();
    return { ...this.post };
  }
}

export const newPost = () => new PostBuilder().build();