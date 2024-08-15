import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// Define the Holder schema
@Schema()
export class Holder {
  @ApiProperty({
    description: 'The asset symbol',
    example: 'AAPL',
  })
  @Prop()
  asset: string;

  @ApiProperty({
    description: 'The full name of the asset',
    example: 'APPLE INC',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'The ISIN of the asset',
    example: 'US0378331005',
  })
  @Prop()
  isin: string;

  @ApiProperty({
    description: 'The CUSIP of the asset',
    example: '037833100',
  })
  @Prop()
  cusip: string;

  @ApiProperty({
    description: 'The number of shares held',
    example: 173305470,
  })
  @Prop({ required: true })
  sharesNumber: number;

  @ApiProperty({
    description: 'The weight percentage of the asset in the ETF',
    example: 6.944,
  })
  @Prop({ required: true })
  weightPercentage: number;

  @ApiProperty({
    description: 'The market value of the asset',
    example: 37475574832.8,
  })
  @Prop({ required: true })
  marketValue: number;

  @ApiProperty({
    description: 'The date and time when the data was last updated',
    example: '2024-08-11 05:08:47',
  })
  @Prop({ required: true })
  updated: Date;
}

export const HolderSchema = SchemaFactory.createForClass(Holder);

// Define the Sector schema
@Schema()
export class Sector {
  @ApiProperty({
    description: 'The industry name',
    example: 'Information Technology',
  })
  @Prop({ required: true })
  industry: string;

  @ApiProperty({
    description: 'The exposure percentage to the industry',
    example: 31.54,
  })
  @Prop({ required: true })
  exposure: number;
}

export const SectorSchema = SchemaFactory.createForClass(Sector);

// Define the ETF schema
@Schema()
export class ETF {
  @ApiProperty({
    description: 'The symbol of the ETF',
    uniqueItems: true,
    example: 'SPY',
  })
  @Prop({ required: true, unique: true })
  symbol: string;

  @ApiProperty({ description: 'The asset class of the ETF', example: 'Equity' })
  @Prop()
  assetClass: string;

  @ApiProperty({
    description: 'Assets Under Management (AUM) of the ETF in dollars',
    example: 537779391745,
  })
  @Prop()
  aum: number;

  @ApiProperty({
    description: 'The average daily trading volume of the ETF',
    example: 51567548,
  })
  @Prop()
  avgVolume: number;

  @ApiProperty({
    description: 'The CUSIP identifier for the ETF',
    example: '78462F103',
  })
  @Prop()
  cusip: string;

  @ApiProperty({
    description: 'A description of the ETF and its objectives',
    example:
      'The Trust seeks to achieve its investment objective by holding a portfolio of the common stocks that are included in the index...',
  })
  @Prop()
  description: string;

  @ApiProperty({
    description: 'The country of domicile for the ETF',
    example: 'US',
  })
  @Prop()
  domicile: string;

  @ApiProperty({
    description: 'The company managing the ETF',
    example: 'SPDR',
  })
  @Prop()
  etfCompany: string;

  @ApiProperty({
    description: 'The expense ratio of the ETF as a percentage',
    example: 0.0945,
  })
  @Prop()
  expenseRatio: number;

  @ApiProperty({
    description: 'The inception date of the ETF',
    example: '1993-01-29',
  })
  @Prop()
  inceptionDate: Date;

  @ApiProperty({
    description: 'The ISIN identifier for the ETF',
    example: 'US78462F1030',
  })
  @Prop()
  isin: string;

  @ApiProperty({
    description: 'The name of the ETF',
    example: 'SPDR S&P 500 ETF Trust',
  })
  @Prop()
  name: string;

  @ApiProperty({
    description: 'The net asset value (NAV) of the ETF',
    example: 532.95,
  })
  @Prop()
  nav: number;

  @ApiProperty({
    description: 'The currency in which the NAV is expressed',
    example: 'USD',
  })
  @Prop()
  navCurrency: string;

  @ApiProperty({
    description: 'A list of sectors and their exposures within the ETF',
    type: [Sector],
  })
  @Prop({ type: [SectorSchema], default: [] })
  sectorsList: Sector[];

  @ApiProperty({
    description: 'The website for more information about the ETF',
    example:
      'https://www.ssga.com/us/en/institutional/etfs/funds/spdr-sp-500-etf-trust-spy',
  })
  @Prop()
  website: string;

  @ApiProperty({
    description: 'The number of holdings in the ETF',
    example: 504,
  })
  @Prop()
  holdingsCount: number;

  @ApiProperty({
    description: 'The list of holders within the ETF',
    type: [Holder],
  })
  @Prop({ type: [HolderSchema], default: [] })
  holders: Holder[];

  @ApiProperty({
    description: '1-Year performance percentage',
    example: 12.34,
  })
  @Prop({ required: false })
  performance1y: number;

  @ApiProperty({
    description: '3-Year performance percentage',
    example: 36.78,
  })
  @Prop({ required: false })
  performance3y: number;

  @ApiProperty({
    description: '5-Year performance percentage',
    example: 62.45,
  })
  @Prop({ required: false })
  performance5y: number;

  @ApiProperty({
    description: '10-Year performance percentage',
    example: 110.56,
  })
  @Prop({ required: false })
  performance10y: number;
}

export const ETFSchema = SchemaFactory.createForClass(ETF);
ETFSchema.index({ symbol: 1 }, { unique: true });
