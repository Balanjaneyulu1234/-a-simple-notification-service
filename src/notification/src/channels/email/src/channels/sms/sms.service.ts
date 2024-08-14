import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  sendSms(recipient: string, message: string) {
    // Implement SMS sending logic here
    return `SMS sent to ${recipient} with message: ${message}`;
  }
}
