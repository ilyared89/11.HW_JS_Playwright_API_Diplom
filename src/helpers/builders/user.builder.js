import { faker } from '@faker-js/faker';

export class UserBuilder {
  constructor() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    this.user = {
      gender: faker.helpers.arrayElement(['male', 'female']),
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName, provider: 'test.com' }).toLowerCase(),
      password: `Test1!${faker.internet.password({ length: 8 })}`,
      confirmPassword: `Test1!${faker.internet.password({ length: 8 })}`,
      country: 'United States',
      city: faker.location.city(),
      address: faker.location.streetAddress(),
      zipCode: faker.location.zipCode(),
      phone: faker.string.numeric(10),
    };
  }

  withGender(value) { this.user.gender = value; return this; }
  withFirstName(value) { this.user.firstName = value; return this; }
  withLastName(value) { this.user.lastName = value; return this; }
  withEmail(value) { this.user.email = value.toLowerCase(); return this; }
  withPassword(value) { this.user.password = value; this.user.confirmPassword = value; return this; }
  withCountry(value) { this.user.country = value; return this; }
  withCity(value) { this.user.city = value; return this; }
  withAddress(value) { this.user.address = value; return this; }
  withZipCode(value) { this.user.zipCode = value; return this; }
  withPhone(value) { this.user.phone = value; return this; }

  build() {
    return { ...this.user };
  }
}

export const newUser = () => new UserBuilder().build();
