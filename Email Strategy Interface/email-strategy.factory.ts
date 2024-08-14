// channel-selector/email-strategy.factory.ts

import { EmailStrategy } from '../communication-strategies/email-strategy.interface';
import { SESEmailStrategy } from '../communication-strategies/ses-email.strategy';
import { MailgunEmailStrategy } from '../communication-strategies/mailgun-email.strategy';

export class EmailStrategyFactory {
    static createStrategy(provider: string): EmailStrategy {
        switch(provider) {
            case 'SES': return new SESEmailStrategy();
            case 'Mailgun': return new MailgunEmailStrategy();
            default: throw new Error(`Unsupported email provider: ${provider}`);
        }
    }
}
