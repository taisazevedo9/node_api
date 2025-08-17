import { CustomFastifyInstance } from "../types.js";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { createUserSchema } from "../schemas/users.schema.js";
import { UsersController } from "../controllers/users.controller.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { checkRequestJWT } from "./hooks/check-request-jwt.js";
import { UserServices } from "../services/users.service.js";

const prisma = new PrismaClient();
const usersController = new UsersController(UserServices);

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  age?: number;
  isAdmin?: boolean;
}
export async function userRoutes(app: CustomFastifyInstance) {
  app.get(
    "/users",
    {
      preHandler: [checkRequestJWT],
      schema: {
        description: "Get all users",
        tags: ["Users"], // Tag for categorizing the route in Swagger UI
        summary: "List Users", // Summary of the route
        response: {
          200: z.array(
            z.object({
              id: z.string(), // Unique identifier for the user
              name: z.string(), // Name of the user
              email: z.string(), // Email of the user
              age: z.number().int().optional(), // Age of the user, optional
              isAdmin: z.boolean().default(false), // Admin status of the user, defaults to false
            })
          ),
        },
      },
    },
    usersController.get.bind(usersController)
  );
  app.post(
    "/users",
    {
      preHandler: [checkRequestJWT],
      schema: {
        description: "Create a new user",
        tags: ["Users"],
        summary: "Create User",
        body: {
          type: "object",
          required: ["name"], // Deve ser um array
          properties: {
            name: { type: "string" }, // Name of the user
            email: { type: "string", format: "email" }, // Email of the user
            password: { type: "string", minLength: 6 }, // Password of the user, minimum length of 6 characters
            age: { type: "integer", minimum: 0 }, // Age of the user, optional
            isAdmin: { type: "boolean", default: false }, // Admin status of the user, defaults to false
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              name: { type: "string", example: "name" },
              email: { type: "string", example: "name@email.com" },
              age: { type: "integer", example: 25 },
              isAdmin: { type: "boolean", example: false },
              message: { type: "string", example: "User created successfully" },
            },
          },
        },
      },
    },
    usersController.create.bind(usersController)
  );
  app.put(
    "/users/:id",
    {
      preHandler: [checkRequestJWT],
      schema: {
        description: "Create a new user",
        tags: ["Users"], // Tag for categorizing the route in Swagger UI
        summary: "Create User", // Summary of the route
        body: {
          type: "object",
          required: ["name"], // Deve ser um array
          properties: {
            name: { type: "string" }, // Name of the user
            email: { type: "string", format: "email" }, // Email of the user
            password: { type: "string", minLength: 6 }, // Password of the user, minimum length of 6 characters
            age: { type: "integer", minimum: 0 }, // Age of the user, optional
            isAdmin: { type: "boolean", default: false }, // Admin status of the user, defaults to false
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              message: { type: "string" }, // Response message when user is created successfully
              id: { type: "string" }, // ID of the created user
            },
          },
          409: {
            type: "object",
            properties: {
              error: { type: "string", example: "Email already in use" },
            },
          },
        },
      },
    },
    usersController.update.bind(usersController)
  );
  app.delete(
    "/users/:id",
    {
      preHandler: [checkRequestJWT],
      schema: {
        description: "Delete a user by ID",
        tags: ["Users"], // Tag for categorizing the route in Swagger UI
        summary: "Delete User", // Summary of the route
        params: {
          type: "object",
          required: ["id"], // ID is required
          properties: {
            id: { type: "string" }, // ID of the user to delete
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" }, // Response message when user is deleted successfully
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      // Deletion of the user in the database
      await prisma.user.delete({
        where: { id },
      });

      // Return success response
      return reply.status(200).send({
        message: "User deleted successfully",
      });
    }
  );
}
