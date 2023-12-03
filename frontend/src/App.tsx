// App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store";
import StockDetails from "./components/StockDetails";
import StockList from "./components/StockList";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<StockList />} />
          <Route path="/stock/:symbol" element={<StockDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
