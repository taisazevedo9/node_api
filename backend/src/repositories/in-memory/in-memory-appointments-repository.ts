import { Appointment } from "../../entities/appointment.js";
import { IAppointmentsRepository } from "../appointments-repository.js";
import { areIntervalsOverlapping } from "date-fns";

export class InMemoryAppointmentsRepository implements IAppointmentsRepository {
  public items: Appointment[] = [];

  async create(appointment: any): Promise<void> {
    this.items.push(appointment);
  }
  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        {
          start: startsAt,
          end: endsAt,
        },
        {
          start: appointment.startsAt,
          end: appointment.endsAt,
        },
        {
          inclusive: true, // Include the start and end dates in the overlap check
        }
      );
    });
    if (!overlappingAppointment) {
      return null;
    }

    return overlappingAppointment;
  }
}
