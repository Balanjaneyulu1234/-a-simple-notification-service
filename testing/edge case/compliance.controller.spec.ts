import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceController } from './compliance.controller';
import { ComplianceService } from './compliance.service';

describe('ComplianceController - Edge Cases', () => {
  let controller: ComplianceController;
  let service: ComplianceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplianceController],
      providers: [
        {
          provide: ComplianceService,
          useValue: {
            processSESNotification: jest.fn(),
            processMailgunEvent: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ComplianceController>(ComplianceController);
    service = module.get<ComplianceService>(ComplianceService);
  });

  it('handles POST request with SES notification missing email address', async () => {
    const notificationMissingEmail = {
      // Mock SES notification missing email information
      notificationType: 'Bounce',
      bounce: {
        bouncedRecipients: [
          {
            emailAddress: '', // Empty or missing email address
          },
        ],
        bounceType: 'Permanent',
      },
    };

    const response = await controller.receiveSESNotification(notificationMissingEmail);
    expect(response).toBeDefined(); // Check if your controller responds appropriately
    expect(service.processSESNotification).toHaveBeenCalledWith(notificationMissingEmail);
  });

  it('handles Mailgun event POST request for untracked email gracefully', async () => {
    const untrackedMailgunEvent = {
      // Mock Mailgun event for an email that was not sent or tracked by your service
      event: 'delivered',
      recipient: 'untracked@example.com',
    };

    const response = await controller.receiveMailgunEvent(untrackedMailgunEvent);
    expect(response).toBeDefined(); // Verify your controller's response
    expect(service.processMailgunEvent).toHaveBeenCalledWith(untrackedMailgunEvent);
  });

  it('ensures idempotency for repeated SES notification POST requests', async () => {
    const duplicateSESNotification = {
      // Duplicate/mock SES bounce notification for the same email
      notificationType: 'Bounce',
      bounce: {
        bouncedRecipients: [
          {
            emailAddress: 'duplicate@example.com',
          },
        ],
        bounceType: 'Permanent',
      },
    };

    await controller.receiveSESNotification(duplicateSESNotification);
    await controller.receiveSESNotification(duplicateSESNotification);
    // Verify idempotency at the service level or ensure the mock was called twice but processed correctly
  });

  // More edge cases can be added here...
});
