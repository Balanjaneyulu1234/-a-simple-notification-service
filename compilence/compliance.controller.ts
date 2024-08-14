// src/compliance/compliance.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { ComplianceEventDTO } from './dto/compliance-event.dto';
import { ComplianceService } from './compliance.service';

@Controller('compliance')
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Post('/ses')
  async receiveSESNotification(@Body() body: any) {
    // Transform SES notification to ComplianceEventDTO and pass to service
    const complianceEvent: ComplianceEventDTO = {
      email: body.mail.destination[0],
      eventType: body.eventType,
      timestamp: new Date(),
      provider: 'SES',
    };
    await this.complianceService.processEvent(complianceEvent);
    return { message: 'SES notification processed' };
  }

  @Post('/mailgun')
  async receiveMailgunEvent(@Body() body: any) {
    // Transform Mailgun event to ComplianceEventDTO and pass to service
    const complianceEvent: ComplianceEventDTO = {
      email: body.recipient,
      eventType: body.event,
      timestamp: new Date(body.timestamp * 1000),
      provider: 'Mailgun',
    };
    await this.complianceService.processEvent(complianceEvent);
    return { message: 'Mailgun event processed' };
  }
}
