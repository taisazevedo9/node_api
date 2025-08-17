import { FastifyReply, FastifyRequest } from "fastify";
import { UserServices } from "../services/users.service.js";
import { createUserSchema } from "../schemas/users.schema.js";
import { IUserService } from "../interfaces/users.interface.js";

export class UsersController {
  constructor(private UserServices: IUserService) {}

  async get(request: FastifyRequest, reply: FastifyReply) {
    const users = await UserServices.get();
    return reply.send(users);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const validatedBody = createUserSchema.parse(request.body);
      const result = await UserServices.create(validatedBody);
      return reply.status(201).send(result);
    } catch (error) {
      return reply
        .status(400)
        .send({ error: "Invalid request body", details: error });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const validatedBody = createUserSchema.partial().parse(request.body);

      const emailInUse = validatedBody.email
        ? await UserServices.findByEmail(validatedBody.email)
        : null;

      if (emailInUse) {
        return reply.status(409).send({ error: "Email already in use" });
      }
      const updatedUser = await UserServices.update(id, validatedBody);

      if (!updatedUser) {
        return reply.status(404).send({ error: "User not found" });
      }

      return reply.send(updatedUser);
    } catch (error) {
      return reply
        .status(400)
        .send({ error: "Invalid request body", details: error });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const deleted = await UserServices.delete(id);
      if (!deleted) {
        return reply.status(404).send({ error: "User not found" });
      }
      return reply.status(204).send();
    } catch (error) {
      return reply
        .status(400)
        .send({ error: "Invalid request", details: error });
    }
  }
}
