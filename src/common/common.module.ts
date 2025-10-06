import { Module } from '@nestjs/common';
import { PaginationService } from './pagination/pagination.service';

@Module({
  exports: [PaginationService],
  providers: [PaginationService],
})
export class CommonModule {}
