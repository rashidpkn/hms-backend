import { Controller } from '@nestjs/common';
import { PurchaseEntryService } from './purchase-entry.service';

@Controller('pharmacy/purchase-entry')
export class PurchaseEntryController {
  constructor(private readonly purchaseEntryService: PurchaseEntryService) {}
}
