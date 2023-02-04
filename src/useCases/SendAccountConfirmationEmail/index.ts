import { MailerSendEmailService } from "@/services/implementations/MailerSendEmailService";

import { SendAccountConfirmationEmailController } from "./SendAccountConfirmationEmailController";
import { SendAccountConfirmationEmailUseCase } from "./SendAccountConfirmationEmailUseCase";

const emailService = new MailerSendEmailService();

const sendAccountConfirmationEmailUseCase =
  new SendAccountConfirmationEmailUseCase(emailService);

const sendAccountConfirmationEmailController =
  new SendAccountConfirmationEmailController(
    sendAccountConfirmationEmailUseCase
  );

export {
  sendAccountConfirmationEmailUseCase,
  sendAccountConfirmationEmailController,
};
