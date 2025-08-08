import { a } from "vitest/dist/chunks/suite.d.FvehnV49.js";
import { Appointment } from "../entities/appointment.js";
import { IAppointmentsRepository } from "../repositories/appointments-repository.js";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository.js";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}
type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt
      );
    if (overlappingAppointment) {
      throw new Error("This appointment overlaps with another one.");
    }

    const appointment = new Appointment({
      id: Math.random().toString(36).substring(2, 15), // Generate a random id
      customer,
      startsAt,
      endsAt,
    });

    await this.appointmentsRepository.create(appointment);
    return appointment;
  }
}
