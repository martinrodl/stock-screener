// BasicInfoTable.tsx
import React from "react";

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
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <tbody>
          <tr>
            <td className="px-4 py-2 border">P/E Ratio</td>
            <td className="px-4 py-2 border">
              {peRatio ? peRatio.toFixed(2) : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Market Cap</td>
            <td className="px-4 py-2 border">
              {marketCap ? `$${marketCap.toLocaleString()}` : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">ROIC</td>
            <td className="px-4 py-2 border">
              {roic ? `${(roic * 100).toFixed(2)}%` : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">ROE</td>
            <td className="px-4 py-2 border">
              {roe ? `${(roe * 100).toFixed(2)}%` : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Debt to Equity</td>
            <td className="px-4 py-2 border">
              {debtToEquity ? debtToEquity.toFixed(2) : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Interest Coverage</td>
            <td className="px-4 py-2 border">
              {interestCoverage ? interestCoverage.toFixed(2) : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BasicInfoTable;
