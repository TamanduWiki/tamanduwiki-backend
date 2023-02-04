import { v4 as uuid } from "uuid";

import { User } from "@/entities/User";

import { IUsersRepository } from "@/repositories/IUsersRepository";

import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO): Promise<User> {
    if (!data.email.includes("@")) {
      throw new Error("E-mail inválido.");
    }

    if (!data.email.includes("@ufabc.edu.br") && !data.email.includes("@aluno.ufabc.edu.br")) {
      throw new Error("Só é permitido cadastro de pessoas com vínculo com a UFABC. Caso tenha, insira seu e-mail institucional da UFABC.");
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("Usuário já existe para esse e-mail.");
    }

    const user: User = {
      ...data,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "pending_auth",
    };

    return await this.usersRepository.save(user);
  }
}
