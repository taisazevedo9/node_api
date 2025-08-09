import { describe, it, expect } from "vitest";
import { CreateAppointment } from "./create-appointment.js";
import { Appointment } from "../entities/appointment.js";
import { getFutureDate } from "../tests/utils/get-future-date.js";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository.js";

describe("Create Appointment Service", async () => {
  it("should create an appointment", async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate("2022-12-10");
    const endsAt = getFutureDate("2022-12-11");

    await expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
  it("should not be able to create an appointment width overlapping dates", async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate("2022-12-14");
    const endsAt = getFutureDate("2022-12-18");

    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "Jane Doe",
        startsAt: getFutureDate("2022-12-14"),
        endsAt: getFutureDate("2022-12-18"),
      })
    ).rejects.toThrow("This appointment overlaps with another one.");

    // expect(
    //   createAppointment.execute({
    //     customer: "Jane Doe",
    //     startsAt: getFutureDate("2022-12-08"),
    //     endsAt: getFutureDate("2022-12-12"),
    //   })
    // ).rejects.toThrow("This appointment overlaps with another one.");
  });
});
