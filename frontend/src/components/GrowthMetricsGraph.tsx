import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { StockDetail } from "../types/StockDetail";

interface GrowthIncomeDataItem {
  date: string; // assuming date is a string, adjust accordingly if it's a Date object
  growthRevenue: number;
  growthNetIncome: number;
}

type GrowthMetricsGraphProps = {
  stockDetail: StockDetail;
};

const GrowthMetricsGraph: React.FC<GrowthMetricsGraphProps> = ({
  stockDetail,
}) => {
  const d3Container = useRef(null);

  const processedData: GrowthIncomeDataItem[] = stockDetail.growthIncomeMetrics
    .map((item) => ({
      date: item.date,
      growthRevenue: item.growthRevenue || 0, // Provide a default value if undefined
      growthNetIncome: item.growthNetIncome || 0, // Provide a default value if undefined
    }))
    .filter(
      (item) =>
        item.growthRevenue !== undefined && item.growthNetIncome !== undefined
    ); // Filter out undefined values

  // Then call drawChart with this processed data
  useEffect(() => {
    if (processedData.length > 0) {
      drawChart(processedData);
    }
  }, [processedData]);

  const drawChart = (data: GrowthIncomeDataItem[]) => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear any existing SVG
    d3.select(d3Container.current).selectChildren().remove();

    // Set up the SVG
    const svg = d3
      .select(d3Container.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => Math.max(d.growthRevenue, d.growthNetIncome)),
      ])
      .nice()
      .range([height, 0]);

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    // Lines
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.growthRevenue));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Repeat the line for growthNetIncome
  };

  useEffect(() => {
    if (stockDetail.growthIncomeMetrics && d3Container.current) {
      drawChart(processedData);
    }
  }, [stockDetail.growthIncomeMetrics]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};

export default GrowthMetricsGraph;
