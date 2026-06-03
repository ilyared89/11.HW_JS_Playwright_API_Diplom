import { faker } from '@faker-js/faker';

export class CommentBuilder {
  constructor() {
    this.comment = {};
  }

  addName() {
    this.comment.name = faker.person.fullName();
    return this;
  }

  addEmail() {
    this.comment.email = faker.internet.email().toLowerCase();
    return this;
  }

  addBody() {
    this.comment.body = faker.lorem.sentence(5);
    return this;
  }

  withName(value) { this.comment.name = value; return this; }
  withEmail(value) { this.comment.email = value.toLowerCase(); return this; }
  withBody(value) { this.comment.body = value; return this; }

  build() {
    if (!this.comment.name) this.addName();
    if (!this.comment.email) this.addEmail();
    if (!this.comment.body) this.addBody();
    return { ...this.comment };
  }
}

export const newComment = () => new CommentBuilder().build();