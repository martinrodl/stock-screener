import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { stockApi } from '../services/stockApi'
import { beApi } from '../services/beApi'
import authReducer from './authSlice'
import storage from 'redux-persist/lib/storage'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import stockReducer from './stockSlice'

const rootReducer = combineReducers({
    stock: stockReducer,
    auth: authReducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [beApi.reducerPath]: beApi.reducer,
    // ... add other reducers
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['stock'], // Ensure the 'stock' reducer is persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(stockApi.middleware)
            .concat(beApi.middleware),
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)
