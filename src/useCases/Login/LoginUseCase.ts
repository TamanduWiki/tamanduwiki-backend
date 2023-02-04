import jwt from "jsonwebtoken";

import { IUsersRepository } from "@/repositories/IUsersRepository";

import { ILoginRequestDTO } from "./LoginDTO";

export class LoginUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    data: ILoginRequestDTO
  ): Promise<{ auth: boolean; token: string }> {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    if (data.password !== user.password) {
      throw new Error("Senha incorreta.");
    }

    if (user.status === "banned") {
      throw new Error("Usuário banido.");
    }

    if (user.status === "suspended") {
      throw new Error("Usuário suspenso.");
    }

    if (user.status === "pending_auth") {
      throw new Error("Usuário ainda não confirmou o e-mail.");
    }

    const { password, ...userData } = user;

    // Expira em 12 horas
    const token = jwt.sign(userData, process.env.JWT_SECRET as string, {
      expiresIn: 43200,
    });

    return { auth: true, token };
  }
}
