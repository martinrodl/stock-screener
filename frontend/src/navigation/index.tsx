import { Routes, Route } from 'react-router-dom'
import Layout from '../layout/Layout'
import StockDetails from '../pages/StockDetails'
import CreateFilter from '../pages/CreateFilter'
import CriteriaList from '../pages/CriteriaList'
import PortfolioStocks from '../pages/PortfolioStocks'
import ConsiderStocks from '../pages/ConsiderStocks'
import SimpleStockList from '../pages/SimpleStockList'
import UserFilters from '../pages/UserFilters'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import EtfList from '../pages/EtfList'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<SimpleStockList />} />
                <Route path="stock-screener" element={<CreateFilter />} />
                <Route path="filter-stock-list/:filterId" element={<CreateFilter />} />
                <Route path="user-filters" element={<UserFilters />} />
                <Route path="stock/:symbol" element={<StockDetails />} />
                <Route path="criteria-list" element={<CriteriaList />} />
                <Route path="portfolio-list" element={<PortfolioStocks />} />
                <Route path="consider-list" element={<ConsiderStocks />} />
                <Route path="stocks/page/:pageNumber" element={<SimpleStockList />} />
                <Route path="etfs/page/:pageNumber" element={<EtfList />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
