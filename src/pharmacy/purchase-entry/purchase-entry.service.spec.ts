import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseEntryService } from './purchase-entry.service';

describe('PurchaseEntryService', () => {
  let service: PurchaseEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseEntryService],
    }).compile();

    service = module.get<PurchaseEntryService>(PurchaseEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
