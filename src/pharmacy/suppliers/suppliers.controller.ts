import { Controller } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';

@Controller('pharmacy/suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}
}
