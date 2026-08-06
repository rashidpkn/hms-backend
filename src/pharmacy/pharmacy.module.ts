import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { PurchaseEntryModule } from './purchase-entry/purchase-entry.module';
import { PurchaseRequestModule } from './purchase-request/purchase-request.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ReportsModule } from './reports/reports.module';
import { SalesReturnModule } from './sales-return/sales-return.module';
import { PurchaseReturnModule } from './purchase-return/purchase-return.module';
import { SalesEntryModule } from './sales-entry/sales-entry.module';

@Module({
  imports: [
    InventoryModule,
    PurchaseEntryModule,
    PurchaseRequestModule,
    SuppliersModule,
    ReportsModule,
    SalesReturnModule,
    PurchaseReturnModule,
    SalesEntryModule,
  ],
})
export class PharmacyModule {}
