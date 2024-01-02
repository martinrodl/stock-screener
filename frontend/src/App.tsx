import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import AppRoutes from './navigation'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App
