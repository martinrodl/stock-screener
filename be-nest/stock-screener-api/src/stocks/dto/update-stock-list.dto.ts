import { IsEnum } from 'class-validator';
import { StockExchange } from '../stocks.enum';

export class UpdateStockListDto {
  @IsEnum(StockExchange, {
    message: 'stockExchange must be a valid stock exchange',
  })
  stockExchange: StockExchange;
}
