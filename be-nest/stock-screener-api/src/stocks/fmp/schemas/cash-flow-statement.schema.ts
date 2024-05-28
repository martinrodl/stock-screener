import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CashFlowStatementDocument = CashFlowStatement & Document;

@Schema({ timestamps: true })
export class CashFlowStatement {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop()
  date: string;

  @Prop()
  reportedCurrency: string;

  @Prop()
  cik: string;

  @Prop()
  fillingDate: Date;

  @Prop()
  acceptedDate: Date;

  @Prop()
  calendarYear: string;

  @Prop()
  period: string;

  @Prop()
  netIncome: number;

  @Prop()
  depreciationAndAmortization: number;

  @Prop()
  deferredIncomeTax: number;

  @Prop()
  stockBasedCompensation: number;

  @Prop()
  changeInWorkingCapital: number;

  @Prop()
  accountsReceivables: number;

  @Prop()
  inventory: number;

  @Prop()
  accountsPayables: number;

  @Prop()
  otherWorkingCapital: number;

  @Prop()
  otherNonCashItems: number;

  @Prop()
  netCashProvidedByOperatingActivities: number;

  @Prop()
  investmentsInPropertyPlantAndEquipment: number;

  @Prop()
  acquisitionsNet: number;

  @Prop()
  purchasesOfInvestments: number;

  @Prop()
  salesMaturitiesOfInvestments: number;

  @Prop()
  otherInvestingActivites: number;

  @Prop()
  netCashUsedForInvestingActivites: number;

  @Prop()
  debtRepayment: number;

  @Prop()
  commonStockIssued: number;

  @Prop()
  commonStockRepurchased: number;

  @Prop()
  dividendsPaid: number;

  @Prop()
  otherFinancingActivites: number;

  @Prop()
  netCashUsedProvidedByFinancingActivities: number;

  @Prop()
  effectOfForexChangesOnCash: number;

  @Prop()
  netChangeInCash: number;

  @Prop()
  cashAtEndOfPeriod: number;

  @Prop()
  cashAtBeginningOfPeriod: number;

  @Prop()
  operatingCashFlow: number;

  @Prop()
  capitalExpenditure: number;

  @Prop()
  freeCashFlow: number;

  @Prop()
  link: string;

  @Prop()
  finalLink: string;
}

export const CashFlowStatementSchema =
  SchemaFactory.createForClass(CashFlowStatement);
