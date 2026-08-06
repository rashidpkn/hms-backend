import { Module } from '@nestjs/common';
import { SalesEntryService } from './sales-entry.service';
import { SalesEntryController } from './sales-entry.controller';

@Module({
  controllers: [SalesEntryController],
  providers: [SalesEntryService],
})
export class SalesEntryModule {}
