import { Appointment } from "../entities/appointment.js";

export interface IAppointmentsRepository {
  create(appointment: Appointment): Promise<void>;
  findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null>;
}
