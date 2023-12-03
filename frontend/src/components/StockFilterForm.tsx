import React, { useState, ChangeEvent, FormEvent } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

// Define the shape of the form state
interface FormState {
  marketCapMin: string;
  peRatioMax: string;
  dividendYieldMin: string;
  roicMin: string;
  roeMin: string;
  solvencyMax: string;
  debtToEquityMax: string;
  interestCoverageMin: string;
  positiveProfitYears: string;
  dividendRevenueRatioMin: string;
  dividendRevenueRatioMax: string;
}

// Props type
interface StockFilterFormProps {
  onSubmit: (formState: FormState) => void;
}

// Tooltip information for each metric
const tooltips: { [key: string]: string } = {
  marketCapMin: "Minimum market capitalization.",
  peRatioMax: "Maximum price-to-earnings ratio.",
  // Add tooltips for other metrics similarly
};

const StockFilterForm: React.FC<StockFilterFormProps> = ({ onSubmit }) => {
  const [formState, setFormState] = useState<FormState>({
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
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formState);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      <button
        onClick={toggleFormVisibility}
        className="mb-2 text-indigo-600 hover:text-indigo-800"
      >
        {isFormVisible ? "Hide Form" : "Show Form"}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
          {/* Input fields with labels and tooltips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formState).map(([key, value]) => (
              <div key={key} className="relative">
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {key.replace(/([A-Z])/g, " $1")}:
                  <span
                    className="ml-1 cursor-pointer text-indigo-600 hover:text-indigo-800"
                    title={tooltips[key]}
                    data-tooltip-id={key}
                  >
                    ⓘ
                  </span>
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
      )}
      <ReactTooltip
        id="marketCapMin"
        place="bottom"
        variant="info"
        content={tooltips.marketCapMin}
      />
    </div>
  );
};

export default StockFilterForm;
