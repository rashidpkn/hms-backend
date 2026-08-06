import { Test, TestingModule } from '@nestjs/testing';
import { SalesEntryService } from './sales-entry.service';

describe('SalesEntryService', () => {
  let service: SalesEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesEntryService],
    }).compile();

    service = module.get<SalesEntryService>(SalesEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
