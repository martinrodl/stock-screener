// BarChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { StockDetail } from "../types/StockDetail";
import { CashflowStatement } from "../types/CashflowStatement";
import { GrowthCashflowMetrics } from "../types/CashflowGrowthMetrics";
import { GrowthIncomeMetrics } from "../types/GrowthIncomeMetrics";
import { KeyMetrics } from "../types/KeyMetrics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Extract valid property names from CashflowStatement type
type propertiesProps =
  | keyof CashflowStatement
  | keyof GrowthCashflowMetrics
  | keyof GrowthIncomeMetrics
  | keyof KeyMetrics;

interface BarChartProps {
  stock: StockDetail;
  properties: propertiesProps[];
}

const BarChart: React.FC<BarChartProps> = ({ stock, properties }) => {
  // Assuming you want to aggregate the values of the same property across all CashflowStatements
  const labels = properties;
  const data = {
    labels,
    datasets: [
      {
        label: "Cashflow Metrics",
        data: labels.map((prop) =>
          stock.cashflowStatements.reduce(
            (acc, statement) => acc + (statement[prop] || 0),
            0
          )
        ),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
