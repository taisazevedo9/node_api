import { faker } from "@faker-js/faker";

export function makeUser(overrides = {}) {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "tais123",
    age: faker.number.int({ min: 18, max: 80 }),
    isAdmin: false,
    ...overrides,
  };
}
