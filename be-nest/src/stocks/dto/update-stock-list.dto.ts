import { IsEnum } from 'class-validator';
import { StockExchange } from '../enums';

export class UpdateStockListDto {
  @IsEnum(StockExchange, {
    message: 'stockExchange must be a valid stock exchange',
  })
  stockExchange: StockExchange;
}
