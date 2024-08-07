export interface CombinedData {
  date: string;
  period: string;
  [key: string]: any;
}

export interface CombinedStatement {
  date: string;
  calendarYear: string;
  period: string;
  cashFlow?: any;
  balanceSheet?: any;
  income?: any;
}
