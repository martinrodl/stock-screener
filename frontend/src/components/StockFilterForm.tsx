import React, { useState } from "react";

const StockFilterForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    marketCapMin: "",
    peRatioMax: "",
    dividendYieldMin: "",
    roicMin: "",
    roeMin: "",
    solvencyMax: "",
    debtToEquityMax: "",
    interestCoverageMin: "",
    positiveProfitYears: "",
    dividendRevenueRatioMin: "",
    dividendRevenueRatioMax: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      {/* Input fields with labels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(formState).map(([key, value]) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700 capitalize"
            >
              {key.replace(/([A-Z])/g, " $1")}:
            </label>
            <input
              type="number"
              name={key}
              id={key}
              value={value}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        ))}
      </div>
      {/* Submit button */}
      <div className="mt-4">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Filter Stocks
        </button>
      </div>
    </form>
  );
};

export default StockFilterForm;
