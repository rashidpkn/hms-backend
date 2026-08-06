import { Controller } from '@nestjs/common';
import { PurchaseReturnService } from './purchase-return.service';

@Controller('pharmacy/purchase-return')
export class PurchaseReturnController {
  constructor(private readonly purchaseReturnService: PurchaseReturnService) {}
}
