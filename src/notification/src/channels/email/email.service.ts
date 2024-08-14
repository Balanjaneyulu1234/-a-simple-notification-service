import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  sendEmail(recipient: string, message: string) {
    // Implement email sending logic here
    return `Email sent to ${recipient} with message: ${message}`;
  }
}
