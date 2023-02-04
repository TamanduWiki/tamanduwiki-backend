import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

import { IEmailService } from "../IEmailService";

export class MailerSendEmailService implements IEmailService {
  private mailerSend;
  private sentFrom;

  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY as string,
    });
    this.sentFrom = new Sender("nao-responda@ufabcwiki.com", "UFABCwiki");
  }

  async sendAccountConfirmationEmail({
    confirmationToken,
    userEmail,
    userFirstName,
  }: {
    confirmationToken: string;
    userEmail: string;
    userFirstName: string;
  }) {
    const recipients = [new Recipient(userEmail, userFirstName)];

    const emailParams = new EmailParams()
      .setFrom(this.sentFrom)
      .setTo(recipients)
      // .setReplyTo(sentFrom)
      .setSubject("UFABCwiki - Confirme seu e-mail")
      .setHtml(
        `<div style="display:flex; flex-direction: column; gap: 8px; align-items: center; justify-content: center;"><strong>Oi! Por favor acesse o link para confirmar o e-mail no UFABCwiki:</strong><a href="${process.env.FRONTEND_ORIGIN}/verify-account?token=${confirmationToken}">Clique aqui para confirmar</a><div>`
      );
    // .setText("This is the text content");

    await this.mailerSend.email.send(emailParams);

    return;
  }
}
