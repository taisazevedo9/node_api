import jwt from "jsonwebtoken";
import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth.controller.js";
const authController = new AuthController();

export async function registerAuthRoutes(app: FastifyInstance) {
  // Rota para gerar um token
  app.post(
    "/login",
    {
      schema: {
        description: "Create a new user",
        tags: ["Login"], // Tag for categorizing the route in Swagger UI
        summary: "Login", // Summary of the route
        body: {
          type: "object",
          required: ["username", "password"], // Deve ser um array
          properties: {
            username: { type: "string" }, // Name of the user
            password: { type: "string", minLength: 6 }, // Password of the user, minimum length of 6 characters
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              message: { type: "string" },
              id: { type: "string" },
            },
          },
          401: {
            type: "object",
            properties: {
              message: { type: "string" },
              id: { type: "string" },
            },
          },
        },
      },
    },
    authController.login.bind(authController)
  );
}
