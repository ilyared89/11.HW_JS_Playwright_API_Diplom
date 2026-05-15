// @ts-check
import { faker } from '@faker-js/faker';

export class UserBuilder {
  constructor() {
    this.user = {
      name: faker.person.fullName(),
      job: faker.person.jobTitle(),
      email: faker.internet.email().toLowerCase(),
      password: `Test1!${faker.internet.password({ length: 8 })}`,
    };
  }

  withName(value) { this.user.name = value; return this; }
  withJob(value) { this.user.job = value; return this; }
  withEmail(value) { this.user.email = value.toLowerCase(); return this; }
  withPassword(value) { this.user.password = value; return this; }

  build() {
    return { ...this.user };
  }
}

export const newUser = () => new UserBuilder().build();
