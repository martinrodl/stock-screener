// App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StockDetails from "./components/StockDetails";
import StockList from "./components/StockList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StockList />} />
        <Route path="/stock/:symbol" element={<StockDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
