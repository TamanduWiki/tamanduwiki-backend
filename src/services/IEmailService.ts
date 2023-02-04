export interface IEmailService {
  sendAccountConfirmationEmail: ({
    confirmationToken,
    userEmail,
    userFirstName,
  }: {
    confirmationToken: string;
    userEmail: string;
    userFirstName: string;
  }) => Promise<void>;
}
