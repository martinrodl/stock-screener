import { Routes, Route } from 'react-router-dom'
import Layout from '../layout/Layout'
import StockDetails from '../pages/StockDetails'
import StockList from '../pages/StockList'
import CriteriaList from '../pages/CriteriaList'
import GrahamList from '../pages/GrahamList'
import PortfolioStocks from '../pages/PortfolioStocks'
import SimpleStockList from '../pages/SimpleStockList'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<SimpleStockList />} />
                <Route path="stock-screener" element={<StockList />} />
                <Route path="stock/:symbol" element={<StockDetails />} />
                <Route path="criteria-list" element={<CriteriaList />} />
                <Route path="graham-list" element={<GrahamList />} />
                <Route path="PortfolioStocks" element={<PortfolioStocks />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
