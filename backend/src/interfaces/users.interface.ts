export interface UserInput {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  isAdmin?: boolean;
  id?: string;
}

export interface IUserService {
  get(): Promise<any[]>;
  create(data: UserInput): Promise<{ message: string; id: string }>;
  delete(id: string): Promise<{ message: string; id: string }>;
  update(id: string, data: UserInput): Promise<{ message: string; id: string }>;
}
