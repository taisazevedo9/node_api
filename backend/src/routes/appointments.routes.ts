import { CustomFastifyInstance } from "../types.js";
import { z } from "zod";
import { DatabasePostgres } from "../database/database-postgres.js";

const database = new DatabasePostgres();

export async function appointmentRoutes(app: CustomFastifyInstance) {
  app.get(
    "/appointments",
    {
      schema: {
        description: "Get all Appointments",
        tags: ["Appointments"], // Tag for categorizing the route in Swagger UI
        summary: "List Appointments", // Summary of the route
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
    "/appointments",
    {
      schema: {
        description: "Create a new Appointments",
        tags: ["Appointments"], // Tag for categorizing the route in Swagger UI
        summary: "Create Appointments", // Summary of the route
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
      const usuario = request.body;

      // Criação do usuário no banco de dados
      const usuarioId = await database.create(usuario);

      // Retorna a resposta de sucesso
      return reply.status(201).send({
        message: "Appointments created successfully",
        id: usuarioId,
      });
    }
  );
  app.put(
    "/appointments/:id",
    {
      schema: {
        description: "Create a new Appointments",
        tags: ["Appointments"], // Tag for categorizing the route in Swagger UI
        summary: "Create Appointments", // Summary of the route
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
      const usuario = request.body;
      const { id } = request.params as { id: string };

      // Criação do usuário no banco de dados
      const usuarioId = await database.update(id, usuario);

      // Retorna a resposta de sucesso
      return reply.status(201).send({
        message: "Appointments created successfully",
        id: usuarioId,
      });
    }
  );

  app.delete(
    "/appointments/:id",
    {
      schema: {
        description: "Delete a user by ID",
        tags: ["Appointments"], // Tag for categorizing the route in Swagger UI
        summary: "Delete Appointments", // Summary of the route
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
      await database.delete(id);

      // Return success response
      return reply.status(200).send({
        message: "User deleted successfully",
      });
    }
  );
}
