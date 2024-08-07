import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StockExchange } from '../enums';

export class UpdateStockListDto {
  @ApiProperty({
    enum: StockExchange,
    description: 'Update the stock list for a specific stock exchange',
  })
  @IsEnum(StockExchange, {
    message: 'stockExchange must be a valid stock exchange',
  })
  stockExchange: StockExchange;
}
