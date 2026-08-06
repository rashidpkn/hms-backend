import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseReturnController } from './purchase-return.controller';
import { PurchaseReturnService } from './purchase-return.service';

describe('PurchaseReturnController', () => {
  let controller: PurchaseReturnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseReturnController],
      providers: [PurchaseReturnService],
    }).compile();

    controller = module.get<PurchaseReturnController>(PurchaseReturnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
