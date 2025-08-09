import { expect, test } from "vitest";
import { Appointment } from "./appointment.js";
import { getFutureDate } from "../tests/utils/get-future-date.js";

test("create an appointment", () => {
  const startsAt = getFutureDate("2024-12-10");
  const endsAt = getFutureDate("2024-12-9");

  startsAt.setDate(startsAt.getDate() + 1); // Set end date to one day before start date
  endsAt.setDate(endsAt.getDate() + 2); // Set end date to one day before start date

  const appointment = new Appointment({
    customer: "John Doe",
    startsAt,
    endsAt,
    id: "1",
  });
  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
});
test("cannot create an appointment with end date before start date", () => {
  const startsAt = getFutureDate("2024-12-10");
  const endsAt = getFutureDate("2024-12-11");

  startsAt.setDate(startsAt.getDate() + 2); // Set end date to one day before start date
  endsAt.setDate(endsAt.getDate() + 1); // Set end date to one day before start date

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
      id: "2", // Add a unique id
    });
  });
});

test("cannot create an appointment with start date before now", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() - 1); // Set end date to one day before start date
  endsAt.setDate(endsAt.getDate() + 3); // Set end date to one day before start date

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
      id: "2", // Add a unique id
    });
  });
});
