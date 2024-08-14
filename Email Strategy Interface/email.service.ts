// services/email.service.ts

import { Injectable } from '@nestjs/common';
import { EmailStrategyFactory } from '../channel-selector/email-strategy.factory';
import { EmailStrategy } from '../communication-strategies/email-strategy.interface';

@Injectable()
export class EmailService {
    private primaryProvider = 'SES';
    private fallbackProvider = 'Mailgun';

    async sendEmailWithRetriesAndFallback(emailData: any, retries = 2) {
        let emailStrategy: EmailStrategy = EmailStrategyFactory.createStrategy(this.primaryProvider);

        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                await emailStrategy.sendEmail(emailData);
                console.log('Email sent successfully!');
                return;
            } catch (error) {
                console.log(`Attempt ${attempt + 1} failed, retrying...`);
            }
        }

        console.log('Retries exhausted, attempting fallback...');
        emailStrategy = EmailStrategyFactory.createStrategy(this.fallbackProvider);

        try {
            await emailStrategy.sendEmail(emailData);
            console.log('Email sent successfully with fallback provider!');
        } catch (error) {
            console.error('Failed to send email with the fallback provider.', error);
            // Integrate with your logging/alert system for high-priority notification
        }
    }
}
