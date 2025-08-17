import { z } from "zod";

export const createAppointmentSchema = z.object({
  customer: z.string(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  userId: z.string(),
});
