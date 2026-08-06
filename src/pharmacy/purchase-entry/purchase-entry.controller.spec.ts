import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseEntryController } from './purchase-entry.controller';
import { PurchaseEntryService } from './purchase-entry.service';

describe('PurchaseEntryController', () => {
  let controller: PurchaseEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseEntryController],
      providers: [PurchaseEntryService],
    }).compile();

    controller = module.get<PurchaseEntryController>(PurchaseEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
