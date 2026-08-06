import { Test, TestingModule } from '@nestjs/testing';
import { SalesEntryController } from './sales-entry.controller';
import { SalesEntryService } from './sales-entry.service';

describe('SalesEntryController', () => {
  let controller: SalesEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesEntryController],
      providers: [SalesEntryService],
    }).compile();

    controller = module.get<SalesEntryController>(SalesEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
