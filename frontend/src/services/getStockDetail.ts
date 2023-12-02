import axios from "axios";
import { StockDetail } from "../types/StockDetail";

export const fetchStockDetails = async (
  symbol: string
): Promise<StockDetail | undefined> => {
  try {
    const response = await axios.get<StockDetail>(
      `${import.meta.env.VITE_BE_URL}/api/onestock?symbol=${symbol}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock details:", error);
    return undefined;
  }
};
