import { AppointmentController } from "../controllers/appointment.controller.js";
import { checkRequestJWT } from "./hooks/check-request-jwt.js";

const appointmentController = new AppointmentController();

export async function appointmentRoutes(app: any) {
  app.get(
    "/appointments",
    {
      preHandler: [checkRequestJWT],
      schema: {
        description: "Get all Appointment",
        tags: ["Appointment"],
        summary: "Get all Appointment",
        querystring: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              description: "ID do usuário relacionado",
            },
            customer: {
              type: "string",
              description: "Nome ou identificador do cliente",
            },
            startsAt: {
              type: "string",
              format: "date-time",
              description: "Data/hora inicial do filtro",
            },
            endsAt: {
              type: "string",
              format: "date-time",
              description: "Data/hora final do filtro",
            },
          },
        },
      },
    },
    appointmentController.get.bind(appointmentController)
  );
  app.post(
    "/appointments",
    {
      preHandler: [checkRequestJWT],
      schema: {
        description: "Create a new Appointment",
        tags: ["Appointment"],
        summary: "Create Appointment",
        body: {
          type: "object",
          properties: {
            customer: { type: "string" }, // Nome ou identificador do cliente
            startsAt: { type: "string", format: "date-time" }, // Data e hora de início
            endsAt: { type: "string", format: "date-time" }, // Data e hora de término
            userId: { type: "string" }, // ID do usuário relacionado
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              customer: { type: "string" }, // Nome ou identificador do cliente
              startsAt: { type: "string", format: "date-time" }, // Data e hora de início
              endsAt: { type: "string", format: "date-time" }, // Data e hora de término
              userId: { type: "string" }, // ID do usuário relacionado
            },
          },
        },
      },
    },
    appointmentController.create.bind(appointmentController)
  );
  app.put(
    "/appointments/:id",
    {
      preHandler: [checkRequestJWT],
      schema: {
        description: "Update an existing Appointment",
        tags: ["Appointment"],
        summary: "Update Appointment",
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
          },
        },
        body: {
          type: "object",
          properties: {
            customer: { type: "string" },
            startsAt: { type: "string", format: "date-time" },
            endsAt: { type: "string", format: "date-time" },
            userId: { type: "string" },
          },
        },
      },
    },
    appointmentController.update.bind(appointmentController)
  );
  app.delete(
    "/appointments/:id",
    {
      preHandler: [checkRequestJWT],
      schema: {
        description: "Delete an existing Appointment",
        tags: ["Appointment"],
        summary: "Delete Appointment",
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
          },
        },
      },
    },
    appointmentController.delete.bind(appointmentController)
  );
}
