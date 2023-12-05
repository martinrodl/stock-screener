import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './store'
import Layout from './layout/Layout'
import StockDetails from './pages/StockDetails'
import StockList from './pages/StockList'
import CriteriaList from './pages/CriteriaList'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        {/* Wrap the routes with the Layout component */}
                        <Route path="/" element={<Layout />}>
                            <Route index element={<StockList />} />
                            <Route path="stock/:symbol" element={<StockDetails />} />
                            <Route path="criteria-list" element={<CriteriaList />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App
