// communication-strategies/ses-email.strategy.ts

import { EmailStrategy } from './email-strategy.interface';

export class SESEmailStrategy implements EmailStrategy {
    async sendEmail(emailData: any): Promise<void> {
        console.log("Attempting to send email via AWS SES...");
        // Here would be the actual SES email sending logic using AWS SDK
        // e.g., SES.sendEmail(params).promise();
    }
}
