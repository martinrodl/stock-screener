import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StockDetail } from "../types/StockDetail";
import { fetchStockDetails } from "../services/getStockDetail";
import GrowthMetricsGraph from "./GrowthMetricsGraph";
import BasicInfoTable from "./BasicInfoTable";
import DetailMetricsTable from "./DetailMetricsTable";

const StockDetails = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState<StockDetail | undefined>(undefined);

  useEffect(() => {
    const getDetail = async () => {
      if (symbol === undefined) return;
      const fetchedStock = await fetchStockDetails(symbol);
      setStock(fetchedStock);
    };
    getDetail();
  }, [symbol]);

  if (!stock) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {stock.name} ({stock.symbol})
      </h1>
      <p>Exchange: {stock.exchange}</p>

      <BasicInfoTable
        marketCap={stock.marketCap}
        peRatio={stock.peRatio}
        roic={stock.keyMetrics[0].roic}
        roe={stock.keyMetrics[0].roe}
        debtToEquity={stock.keyMetrics[0].debtToEquity}
        interestCoverage={stock.keyMetrics[0].interestCoverage}
      />
      <DetailMetricsTable stockDetail={stock} />

      <div className="my-4">
        <h2 className="text-lg font-semibold">Growth Metrics Graph</h2>
        <GrowthMetricsGraph stockDetail={stock} />
      </div>
    </div>
  );
};

export default StockDetails;
