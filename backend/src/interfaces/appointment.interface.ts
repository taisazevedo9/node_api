export interface AppointmentInput {
  customer: string; // ou customer, mas deve bater com o campo do Prisma
  startsAt: string;
  endsAt: string;
  userId: string;
}

export interface IAppointmentService {
  get(): Promise<any[]>;
  create(data: AppointmentInput): Promise<{ message: string; id: string }>;
  update(
    id: string,
    data: AppointmentInput
  ): Promise<{ message: string; id: string }>;
  delete(id: string): Promise<{ message: string; id: string }>;
}
