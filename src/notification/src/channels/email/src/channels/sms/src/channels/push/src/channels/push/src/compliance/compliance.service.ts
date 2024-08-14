import { Injectable } from '@nestjs/common';

@Injectable()
export class ComplianceService {
  checkCompliance(notificationType: string, recipient: string): boolean {
    // Implement compliance check logic here
    return true;
  }
}
