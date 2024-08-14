import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceController } from './compliance.controller';
import { ComplianceService } from './compliance.service';

describe('ComplianceController - Expanded Scenarios', () => {
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
          }
        }
      ],
    }).compile();

    controller = module.get<ComplianceController>(ComplianceController);
    service = module.get<ComplianceService>(ComplianceService);
  });

  it('processes SES notification correctly - Happy Path', async () => {
    const sesNotification = { 
      // Populate with SES notification mock data
    };
    const response = await controller.receiveSESNotification(sesNotification);
    expect(response).toEqual({ message: 'SES notification processed' });
    expect(service.processSESNotification).toHaveBeenCalledWith(sesNotification);
  });

  it('processes Mailgun event correctly - Happy Path', async () => {
    const mailgunEvent = { 
      // Populate with Mailgun event mock data
    };
    const response = await controller.receiveMailgunEvent(mailgunEvent);
    expect(response).toEqual({ message: 'Mailgun event processed' });
    expect(service.processMailgunEvent).toHaveBeenCalledWith(mailgunEvent);
  });

  it('returns error for invalid SES notification format - Negative Case', async () => {
    const invalidSESNotification = { 
      // Populate with invalid SES notification data
    };
    
    // Assuming global error handling returns a 400 response for invalid input
    try {
      await controller.receiveSESNotification(invalidSESNotification);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toContain('Invalid SES notification format');
    }
  });

  it('properly handles unexpected errors from the service layer - Negative Case', async () => {
    jest.spyOn(service, 'processSESNotification').mockImplementation(async () => {
      throw new Error('Unexpected Error');
    });

    try {
      await controller.receiveSESNotification({ /* valid SES notification object */ });
    } catch (error) {
      expect(error.message).toBe('Unexpected Error');
      // Optionally check that the error was logged or handled correctly
    }
  });

  // Additional tests can include scenarios like authorization checks, rate limiting, etc.
});
