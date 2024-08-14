// communication-strategies/mailgun-email.strategy.ts

import { EmailStrategy } from './email-strategy.interface';

export class MailgunEmailStrategy implements EmailStrategy {
    async sendEmail(emailData: any): Promise<void> {
        console.log("Attempting to send email via Mailgun...");
        // Here would be the actual Mailgun email sending logic using Mailgun SDK or API
        // e.g., mailgun.messages().send(data);
    }
}
