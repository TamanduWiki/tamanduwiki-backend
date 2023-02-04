import jwt from "jsonwebtoken";

import { User } from "@/entities/User";

import { IEmailService } from "@/services/IEmailService";

export class SendAccountConfirmationEmailUseCase {
  constructor(private emailService: IEmailService) {}

  async execute(newUser: User): Promise<void> {
    // Expira em 1 hora
    const token = jwt.sign(
      { entity: newUser, emailType: "verifyAccount" },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 3600,
      }
    );

    await this.emailService.sendAccountConfirmationEmail({
      confirmationToken: token,
      userEmail: newUser.email,
      userFirstName: newUser.firstName,
    });

    return;
  }
}
