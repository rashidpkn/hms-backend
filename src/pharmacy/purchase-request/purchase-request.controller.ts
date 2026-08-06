import { Controller } from '@nestjs/common';
import { PurchaseRequestService } from './purchase-request.service';

@Controller('pharmacy/purchase-request')
export class PurchaseRequestController {
  constructor(
    private readonly purchaseRequestService: PurchaseRequestService,
  ) {}
}
