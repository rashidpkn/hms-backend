import { Controller } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('pharmacy/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
}
