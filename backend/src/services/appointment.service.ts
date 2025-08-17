import { PrismaClient } from "@prisma/client";
import { AppointmentInput } from "../interfaces/appointment.interface.js";

const prisma = new PrismaClient();

class AppointmentService {
  async get() {
    return prisma.appointment.findMany({
      include: { user: true },
    });
  }

  async create(data: AppointmentInput) {
    const appointment = await prisma.appointment.create({
      data: {
        customer: data.customer,
        startsAt: new Date(data.startsAt),
        endsAt: new Date(data.endsAt),
        userId: data.userId,
      },
    });
    return { message: "Appointment created successfully", id: appointment.id };
  }

  async update(id: string, data: AppointmentInput) {
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        customer: data.customer,
        startsAt: new Date(data.startsAt),
        endsAt: new Date(data.endsAt),
        userId: data.userId,
      },
    });
    return { message: "Appointment updated successfully", id: appointment.id };
  }

  async delete(id: string) {
    await prisma.appointment.delete({ where: { id } });
    return { message: "Appointment deleted successfully", id };
  }
  async isTimeSlotAvailable(
    userId: string,
    startsAt: Date,
    endsAt: Date
  ): Promise<boolean> {
    const overlapping = await prisma.appointment.findFirst({
      where: {
        userId,
        OR: [
          {
            startsAt: {
              lt: endsAt,
            },
            endsAt: {
              gt: startsAt,
            },
          },
        ],
      },
    });
    return !overlapping && startsAt > new Date();
  }
  async getFiltered(where: any) {
    return prisma.appointment.findMany({
      where,
      include: { user: true },
    });
  }
}

export const appointmentService = new AppointmentService();
