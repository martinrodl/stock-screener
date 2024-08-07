import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePortfolioDto {
  @IsMongoId()
  @ApiProperty({ example: '6652f9ee06baf75ceb6c219e' })
  stockId: string;
}

export class UpdateConsiderDto {
  @IsMongoId()
  @ApiProperty({ example: '6652f9ee06baf75ceb6c219e' })
  stockId: string;
}
