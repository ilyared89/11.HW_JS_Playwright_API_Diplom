import { faker } from '@faker-js/faker';

export class CommentBuilder {
  constructor() {
    this.comment = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      body: faker.lorem.sentence(5),
    };
  }

  withName(value) { this.comment.name = value; return this; }
  withEmail(value) { this.comment.email = value.toLowerCase(); return this; }
  withBody(value) { this.comment.body = value; return this; }

  build() {
    return { ...this.comment };
  }
}

export const newComment = () => new CommentBuilder().build();
