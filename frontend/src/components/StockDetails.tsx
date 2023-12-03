import { useParams, useNavigate } from "react-router-dom";

import BarChart from "./BarChart";
import BasicInfoTable from "./BasicInfoTable";
import DetailMetricsTable from "./DetailMetricsTable";
import { useGetStockDetailQuery } from "../services/stockApi";

const StockDetails = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const {
    data: stock,
    error,
    isLoading,
  } = useGetStockDetailQuery(symbol ?? "");

  const handleBackButtonClick = () => {
    navigate("/");
  };

  if (!stock || isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) return <div>Error: {String(error)}</div>;

  return (
    <div className="p-4 flex flex-col items-center">
      <button
        onClick={handleBackButtonClick}
        className="mb-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Back to Stocks
      </button>
      <div className="flex gap-x-3 items-center mb-4">
        <h1 className="text-xl font-bold">
          {stock.name} ({stock.symbol})
        </h1>
        <p>Exchange: {stock.exchange}</p>
      </div>
      <div className="mb-4">
        <BasicInfoTable
          marketCap={stock.marketCap}
          peRatio={stock.peRatio}
          roic={stock.keyMetrics[0].roic}
          roe={stock.keyMetrics[0].roe}
          debtToEquity={stock.keyMetrics[0].debtToEquity}
          interestCoverage={stock.keyMetrics[0].interestCoverage}
        />
      </div>

      <DetailMetricsTable stockDetail={stock} />

      <div className="my-4">
        <h2 className="text-lg font-semibold">Growth Metrics Graph</h2>
        <BarChart
          stock={stock}
          properties={["growthNetIncome", "growthRevenue"]}
        />
      </div>
    </div>
  );
};

export default StockDetails;
