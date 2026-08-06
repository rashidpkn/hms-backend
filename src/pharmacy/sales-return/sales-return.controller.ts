import { Controller } from '@nestjs/common';
import { SalesReturnService } from './sales-return.service';

@Controller('pharmacy/sales-return')
export class SalesReturnController {
  constructor(private readonly salesReturnService: SalesReturnService) {}
}
