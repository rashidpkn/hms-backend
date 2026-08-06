import { Module } from '@nestjs/common';
import { PurchaseEntryService } from './purchase-entry.service';
import { PurchaseEntryController } from './purchase-entry.controller';

@Module({
  controllers: [PurchaseEntryController],
  providers: [PurchaseEntryService],
})
export class PurchaseEntryModule {}
