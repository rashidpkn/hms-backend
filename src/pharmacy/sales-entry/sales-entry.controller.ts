import { Controller } from '@nestjs/common';
import { SalesEntryService } from './sales-entry.service';

@Controller('pharmacy/sales-entry')
export class SalesEntryController {
  constructor(private readonly salesEntryService: SalesEntryService) {}
}
