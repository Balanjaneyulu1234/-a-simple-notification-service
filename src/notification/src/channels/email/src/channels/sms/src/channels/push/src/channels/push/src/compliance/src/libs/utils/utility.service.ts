import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  // Utility methods that can be used across services
  formatRecipient(recipient: string): string {
    // Implement formatting logic
    return recipient.trim().toLowerCase();
  }
}
