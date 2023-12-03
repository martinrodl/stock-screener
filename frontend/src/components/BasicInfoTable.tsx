import React from "react";
import { formatBigNumber } from "../helpers/formatNumber";

interface BasicInfoProps {
  peRatio: number | null;
  marketCap: number | null;
  roic: number | null;
  roe: number | null;
  debtToEquity: number | null;
  interestCoverage: number | null;
}

const BasicInfoTable: React.FC<BasicInfoProps> = ({
  peRatio,
  marketCap,
  roic,
  roe,
  debtToEquity,
  interestCoverage,
}) => {
  return (
    <div className="flex flex-col space-y-5 border p-3 rounded-md min-w-[220px] max-w-lg">
      <div className="flex justify-between border-b py-2">
        <span>P/E Ratio:</span>
        <span>{peRatio ? peRatio.toFixed(2) : "N/A"}</span>
      </div>
      <div className="flex justify-between border-b py-2">
        <span>Market Cap:</span>
        <span>{marketCap ? formatBigNumber(marketCap) : "N/A"}</span>
      </div>
      <div className="flex justify-between border-b py-2">
        <span>ROIC:</span>
        <span>{roic ? `${(roic * 100).toFixed(2)}%` : "N/A"}</span>
      </div>
      <div className="flex justify-between border-b py-2">
        <span>ROE:</span>
        <span>{roe ? `${(roe * 100).toFixed(2)}%` : "N/A"}</span>
      </div>
      <div className="flex justify-between border-b py-2">
        <span>Debt to Equity:</span>
        <span>{debtToEquity ? debtToEquity.toFixed(2) : "N/A"}</span>
      </div>
      <div className="flex justify-between border-b py-2">
        <span>Interest Coverage:</span>
        <span>{interestCoverage ? interestCoverage.toFixed(2) : "N/A"}</span>
      </div>
    </div>
  );
};

export default BasicInfoTable;
