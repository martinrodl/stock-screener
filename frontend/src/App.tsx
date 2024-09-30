import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import AppRoutes from './navigation'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <BrowserRouter>
                    <AuthProvider>
                        <ErrorBoundary>
                            <AppRoutes />
                        </ErrorBoundary>
                    </AuthProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App
