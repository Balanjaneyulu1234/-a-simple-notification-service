// src/compliance/dto/compliance-event.dto.ts

export class ComplianceEventDTO {
  email: string;
  eventType: 'bounce' | 'complaint';
  timestamp: Date;
  provider: 'SES' | 'Mailgun';
  // Add more fields as necessary
}
