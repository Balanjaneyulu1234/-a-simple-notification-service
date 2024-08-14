import { Injectable } from '@nestjs/common';
import { EmailService } from '../channels/email/email.service';
import { SmsService } from '../channels/sms/sms.service';
import { PushService } from '../channels/push/push.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    private readonly pushService: PushService,
  ) {}

  async notifyEmail(recipient: string, message: string) {
    return this.emailService.sendEmail(recipient, message);
  }

  async notifySms(recipient: string, message: string) {
    return this.smsService.sendSms(recipient, message);
  }

  async notifyPush(recipient: string, message: string) {
    return this.pushService.sendPush(recipient, message);
  }
}
