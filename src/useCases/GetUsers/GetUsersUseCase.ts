import { IUsersRepository } from "@/repositories/IUsersRepository";

export class GetUsersUseCase {
  constructor (private usersRepository: IUsersRepository) {}

  async execute() {
    const users = await this.usersRepository.listAll();

    return users;
  }
}
