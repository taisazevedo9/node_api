import { randomUUID } from "crypto";
import { CustomFastifyInstance } from "./types.js";
import { z } from "zod";
import { DatabasePostgres } from "./database/database-postgres.js";

interface User {
  id: string; // Unique identifier for the user
  name: string; // Name of the user
  email: string; // Email of the user
  password: string; // Password of the user
  age?: number; // Age of the user, optional
  isAdmin?: boolean; // Admin status of the user, defaults to false
}
const users: User[] = []; // Array to store users
const database = new DatabasePostgres();

export async function routes(app: CustomFastifyInstance) {
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
      const users = await database.list();
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
        body: z.object({
          name: z.string(), // Name of the user
          email: z.string(), // Email of the user
          password: z.string().min(6), // Password of the user, minimum length of 6 characters
          age: z.number().int().optional(), // Age of the user, optional
          isAdmin: z.boolean().default(false), // Admin status of the user, defaults to false
        }),
        response: {
          201: z.object({
            message: z.string(), // Response message when user is created successfully
            id: z.string(), // ID of the created user
          }),
        },
      },
    },
    async (request, reply) => {
      const usuario = request.body;
      const usuarioId = await database.create(usuario);
      return reply.status(201).send({
        message: "User created successfully",
        id: usuarioId,
      });
    }
  );
}
