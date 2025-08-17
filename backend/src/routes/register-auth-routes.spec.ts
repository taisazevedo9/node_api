import Fastify from "fastify";
import supertest from "supertest";
import { registerAuthRoutes } from "./register-auth-routes.js";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

describe("registerAuthRoutes", () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    app = Fastify();
    await app.register(registerAuthRoutes);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return token for valid credentials", async () => {
    const response = await supertest(app.server)
      .post("/login")
      .send({ username: "tais", password: "tais123" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should return 401 for invalid credentials", async () => {
    const response = await supertest(app.server)
      .post("/login")
      .send({ username: "wrong", password: "wrongpass" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Credenciais inválidas");
  });
});
