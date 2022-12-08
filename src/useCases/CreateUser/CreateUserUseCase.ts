import { User } from "@/entities/User";
import { IUsersRepository } from "@/repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor (private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "pending_auth",
    });

    return await this.usersRepository.save(user);
  }
}
