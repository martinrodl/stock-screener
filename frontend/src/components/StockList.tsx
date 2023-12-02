import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StockFilterForm from "./StockFilterForm";
import { Stock } from "../types/Stock";

const StockList = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  const fetchStocks = async (criteria: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BE_URL}/api/filterstocks`,
        criteria
      );
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  return (
    <div>
      <StockFilterForm onSubmit={fetchStocks} />
      <div className="mt-6">
        {stocks.map((stock, index) => (
          <Link
            to={`/stock/${stock.symbol}`}
            key={index}
            className="block p-4 border-b border-gray-200"
          >
            <h2 className="text-lg font-semibold">{stock.name}</h2>
            <p className="text-sm text-gray-600">{stock.symbol}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-500">
                Market Cap: ${stock.marketCap.toLocaleString()}
              </span>
              <span className="text-gray-500">
                P/E Ratio: {stock.peRatio.toFixed(2)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StockList;
