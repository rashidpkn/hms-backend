import { Controller } from '@nestjs/common';
import { BatchesService } from './batches.service';

@Controller('pharmacy/inventory/batches')
export class BatchesController {
  constructor(private readonly batchesService: BatchesService) {}
}
