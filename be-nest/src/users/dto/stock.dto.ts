import { IsEmail, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePortfolioDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsMongoId()
  @ApiProperty({ example: '6652f9ee06baf75ceb6c219e' })
  stockId: string;
}

export class UpdateConsiderDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsMongoId()
  @ApiProperty({ example: '6652f9ee06baf75ceb6c219e' })
  stockId: string;
}
