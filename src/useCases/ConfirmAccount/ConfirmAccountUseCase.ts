import jwt, { JwtPayload } from "jsonwebtoken";

import { User } from "@/entities/User";

import { IUsersRepository } from "@/repositories/IUsersRepository";

export class ConfirmAccountUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(token: string): Promise<void> {
    if (!token) {
      throw Error("Nenhum token providenciado.");
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, _) => {
      if (err) throw err;
    });

    const decoded = jwt.decode(token) as { entity: Omit<User, "password">, emailType: string } & JwtPayload;

    const user = await this.usersRepository.findByEmail(decoded?.entity?.email);

    if (!user) {
      throw Error("Usuário não existente.");
    }

    if (user.status === "banned") {
      throw Error("Usuário banido.");
    }

    if (user.status === "suspended") {
      throw Error("Usuário suspenso.");
    }

    if (user.status === "active") {
      throw Error("E-mail já confirmado.");
    }

    await this.usersRepository.update(decoded?.entity?.email, { status: "active" });
  }
}
