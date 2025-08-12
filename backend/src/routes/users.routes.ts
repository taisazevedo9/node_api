import { CustomFastifyInstance } from "../types.js";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
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
    async (request, reply) => {
      const users = await prisma.user.findMany();
      // Ajuste para garantir que age/isAdmin estejam sempre definidos
      return users.map((u: any) => ({
        ...u,
        age: u.age ?? null,
        isAdmin: u.isadmin ?? false, // pode vir como isadmin do banco
      }));
    }
  );
  app.post(
    "/users",
    {
      schema: {
        description: "Create a new user",
        tags: ["Users"], // Tag for categorizing the route in Swagger UI
        summary: "Create User", // Summary of the route
        body: {
          type: "object",
          required: ["name", "email", "password"], // Deve ser um array
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
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, age, isAdmin } =
        request.body as CreateUserRequest;
      // Criação do usuário no banco de dados
      const usuarioId = await prisma.user.create({
        data: {
          name,
          email,
          password, // Em produção, você deve hash a senha antes de salvar
          age,
          is_admin: isAdmin ?? false,
        },
      });

      // Retorna a resposta de sucesso
      return reply.status(201).send({
        message: "User created successfully",
        id: usuarioId,
      });
    }
  );
  app.put(
    "/users/:id",
    {
      schema: {
        description: "Create a new user",
        tags: ["Users"], // Tag for categorizing the route in Swagger UI
        summary: "Create User", // Summary of the route
        body: {
          type: "object",
          required: ["name", "email", "password"], // Deve ser um array
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
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { name, email, password, age, isAdmin } =
        request.body as CreateUserRequest;

      // Criação do usuário no banco de dados
      const usuarioId = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          password, // Em produção, você deve hash a senha antes de salvar
          age,
          is_admin: isAdmin,
        },
      });

      // Retorna a resposta de sucesso
      return reply.status(201).send({
        message: "User created successfully",
        id: usuarioId,
      });
    }
  );
  app.delete(
    "/users/:id",
    {
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
