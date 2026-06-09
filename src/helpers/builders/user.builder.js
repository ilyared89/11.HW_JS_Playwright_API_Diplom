import { faker } from '@faker-js/faker';

export class UserBuilder {
  constructor() {
    this.user = {};
  }

  addGender() {
    this.user.gender = faker.helpers.arrayElement(['male', 'female']);
    return this;
  }

  addFirstName() {
    this.user.firstName = faker.person.firstName();
    return this;
  }

  addLastName() {
    this.user.lastName = faker.person.lastName();
    return this;
  }

  addEmail() {
    const first = this.user.firstName || faker.person.firstName();
    const last = this.user.lastName || faker.person.lastName();
    this.user.email = faker.internet.email({ firstName: first, lastName: last, provider: 'test.com' }).toLowerCase();
    return this;
  }

  addPassword() {
    const pwd = `Test1!${faker.internet.password({ length: 8 })}`;
    this.user.password = pwd;
    this.user.confirmPassword = pwd; 
    return this;
  }

  addCountry() {
    this.user.country = 'United States';
    return this;
  }

  addCity() {
    this.user.city = faker.location.city();
    return this;
  }

  addAddress() {
    this.user.address = faker.location.streetAddress();
    return this;
  }

  addZipCode() {
    this.user.zipCode = faker.location.zipCode();
    return this;
  }

  addPhone() {
    this.user.phone = faker.string.numeric(10);
    return this;
  }

  // Методы для явного переопределения
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
    // Автоматически заполняем все поля, если не были вызваны явно
    if (!this.user.gender) this.addGender();
    if (!this.user.firstName) this.addFirstName();
    if (!this.user.lastName) this.addLastName();
    if (!this.user.email) this.addEmail();
    if (!this.user.password) this.addPassword();
    if (!this.user.country) this.addCountry();
    if (!this.user.city) this.addCity();
    if (!this.user.address) this.addAddress();
    if (!this.user.zipCode) this.addZipCode();
    if (!this.user.phone) this.addPhone();
    return { ...this.user };
  }
}

export const newUser = () => new UserBuilder().build();