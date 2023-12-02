import React from "react";
import { StockDetail } from "../types/StockDetail";
import { IncomeStatement } from "../types/IncomeStatement";
import { KeyMetrics } from "../types/KeyMetrics";

type DetailedMetricsTableProps = {
  stockDetail: StockDetail;
};

const DetailedMetricsTable: React.FC<DetailedMetricsTableProps> = ({
  stockDetail,
}) => {
  const findKeyMetrics = (
    incomeStatement: IncomeStatement
  ): KeyMetrics | undefined => {
    return stockDetail.keyMetrics.find(
      (km) => km.date === incomeStatement.date
    );
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th>Date</th>
          <th>Net Income</th>
          <th>Revenue</th>
          <th>Debt</th>
          <th>Dividend Yield</th>
          <th>Profit Margin</th>
        </tr>
      </thead>
      <tbody>
        {stockDetail.incomeStatements.map((incomeStatement, index) => {
          const keyMetrics = findKeyMetrics(incomeStatement);
          const totalDebt =
            stockDetail.balanceSheetStatements[index]?.shortTermDebt +
            stockDetail.balanceSheetStatements[index]?.longTermDebt;

          return (
            <tr key={index}>
              <td>{new Date(incomeStatement.date).toLocaleDateString()}</td>
              <td>{incomeStatement.netIncome}</td>
              <td>{incomeStatement.revenue}</td>
              <td>{totalDebt}</td>
              <td>{keyMetrics?.dividendYield}</td>
              <td>
                {(incomeStatement.netIncome / incomeStatement.revenue).toFixed(
                  2
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DetailedMetricsTable;
