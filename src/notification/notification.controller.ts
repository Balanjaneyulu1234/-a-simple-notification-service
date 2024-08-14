import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('email')
  notifyEmail(@Body() body: { recipient: string; message: string }) {
    return this.notificationService.notifyEmail(body.recipient, body.message);
  }

  @Post('sms')
  notifySms(@Body() body: { recipient: string; message: string }) {
    return this.notificationService.notifySms(body.recipient, body.message);
  }

  @Post('push')
  notifyPush(@Body() body: { recipient: string; message: string }) {
    return this.notificationService.notifyPush(body.recipient, body.message);
  }
}
