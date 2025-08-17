import Fastify from "fastify";
import supertest from "supertest";
import { UsersController } from "./users.controller.js";
import { describe, it, beforeAll, afterAll, expect } from "vitest";
import { makeUser } from "../tests/factories/make-user.js";
import { IUserService } from "../interfaces/users.interface.js";

interface UserInput {
  name: string;
  email: string;
  password?: string;
  age?: number;
  isAdmin?: boolean;
}
const userServiceMock: IUserService = {
  get: async () => [makeUser()],
  create: async (data: UserInput) => ({
    ...data,
    message: "User created successfully",
    id: "1",
  }),
  update: async (id: string, data: UserInput) => ({
    message: "User updated successfully",
    id,
  }),
  delete: async (id: string) => ({
    message: "User deleted successfully",
    id,
  }),
  // findByEmail: async (email: string) => false,
};
const usersController = new UsersController(userServiceMock);

describe("UsersController", () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    app = Fastify();
    app.get("/users", usersController.get.bind(usersController));
    app.post("/users", usersController.create.bind(usersController));
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return all users", async () => {
    const response = await supertest(app.server).get("/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].name).toBe("Tais");
  });
  it("should create a user", async () => {
    const user = makeUser();

    const response = await supertest(app.server).post("/users").send(user);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(user.name);
    expect(response.body.email).toBe(user.email);
    expect(response.body.message).toBe("User created successfully");
  });

  // it("should return 400 for invalid body", async () => {
  //   const response = await supertest(app.server).post("/users").send({
  //     name: "", // inválido
  //     email: "invalid-email",
  //     password: "123", // menos de 6 caracteres
  //   });

  //   expect(response.status).toBe(400);
  //   expect(response.body.error).toBe("Invalid request body");
  // });
});
