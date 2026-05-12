import { faker } from '@faker-js/faker';

export const testData = {
  generateUser: () => ({
    username: faker.internet.username(),
    password: faker.internet.password({ length: 10 }),
    email: faker.internet.email()
  }),
  generateProductSearch: () => faker.commerce.productName()
};