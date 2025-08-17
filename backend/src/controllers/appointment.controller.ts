import { FastifyRequest, FastifyReply } from "fastify";
import { appointmentService } from "../services/appointment.service.js";
import { createAppointmentSchema } from "../schemas/appointment.schema.js";

export class AppointmentController {
  async get(request: FastifyRequest, reply: FastifyReply) {
    const { userId, customer, startsAt, endsAt } = request.query as {
      userId?: string;
      customer?: string;
      startsAt?: string;
      endsAt?: string;
    };
    const where: any = {};
    if (userId) where.userId = userId;
    if (customer) where.customer = customer;
    if (startsAt && endsAt) {
      where.startsAt = { gte: new Date(startsAt) };
      where.endsAt = { lte: new Date(endsAt) };
    }

    const appointments = await appointmentService.getFiltered(where);
    return reply.send(appointments);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const validatedBody = createAppointmentSchema.parse(request.body);

      const existingAppointment = await appointmentService.isTimeSlotAvailable(
        validatedBody.userId,
        new Date(validatedBody.startsAt),
        new Date(validatedBody.endsAt)
      );
      console.log("existingAppointment:", existingAppointment);
      if (!existingAppointment) {
        return reply
          .status(409)
          .send({ error: "Já existe um lançamento para esse dia." });
      }
      const result = await appointmentService.create(validatedBody);
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
      const validatedBody = createAppointmentSchema.parse(request.body);
      const result = await appointmentService.update(id, validatedBody);
      return reply.status(200).send(result);
    } catch (error) {
      return reply
        .status(400)
        .send({ error: "Invalid request body", details: error });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const result = await appointmentService.delete(id);
      return reply.status(200).send(result);
    } catch (error) {
      return reply
        .status(400)
        .send({ error: "Invalid request", details: error });
    }
  }
}
