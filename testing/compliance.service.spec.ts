import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceService } from './compliance.service';

describe('ComplianceService', () => {
  let service: ComplianceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceService],
    }).compile();

    service = module.get<ComplianceService>(ComplianceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process SES bounce notification correctly', async () => {
    // Mock the SES notification body
    const sesNotification = {
      // Populate with SES notification mock data
    };

    const processSpy = jest.spyOn(service, 'processSESNotification').mockImplementation(async () => undefined);
    await service.processSESNotification(sesNotification);
    expect(processSpy).toHaveBeenCalledWith(sesNotification);
  });

  it('should process Mailgun event correctly', async () => {
    // Mock the Mailgun event body
    const mailgunEvent = {
      // Populate with Mailgun event mock data
    };

    const processSpy = jest.spyOn(service, 'processMailgunEvent').mockImplementation(async () => undefined);
    await service.processMailgunEvent(mailgunEvent);
    expect(processSpy).toHaveBeenCalledWith(mailgunEvent);
  });
});
