import { User } from "@/entities/User";

export interface IUsersRepository {
  listAll: () => Promise<User[]>;
  findByEmail: (email: string) => Promise<User | undefined>;
  save: (user: User) => Promise<User>;
  update: (email: string, user: Partial<User>) => Promise<User>;
}
