import { PrismaClient } from "@prisma/client";
import { IUserService, UserInput } from "../interfaces/users.interface.js";

const prisma = new PrismaClient();

class UserService implements IUserService {
  constructor(private prisma: PrismaClient) {}

  async delete(id: string): Promise<{ message: string; id: string }> {
    const userId = String(id);
    await prisma.user.delete({ where: { id: userId } });
    return { message: "User deleted successfully", id: userId };
  }

  async update(
    id: string,
    data: UserInput
  ): Promise<{ message: string; id: string }> {
    const userId = String(id);
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age ?? null,
        is_admin: data.isAdmin ?? false,
      },
    });
    return { message: "User updated successfully", id: user.id };
  }

  async get(): Promise<any[]> {
    const users = await prisma.user.findMany();
    return users.map((u) => ({
      ...u,
      age: u.age ?? null,
      isAdmin: u.is_admin ?? false,
    }));
  }

  async create(data: UserInput): Promise<{ message: string; id: string }> {
    const user = await prisma.user.create({
      data: {
        name: data.name ?? "",
        email: data.email ?? "",
        password: data.password ?? "",
        age: data.age ?? null,
        is_admin: data.isAdmin ?? false,
      },
    });
    return { message: "User created successfully", id: user.id };
  }
  async findByEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return !!user;
  }
}

export const UserServices = new UserService(prisma);
