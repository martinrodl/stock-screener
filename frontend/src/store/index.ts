import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { stockApi } from '../services/stockApi'
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
    [stockApi.reducerPath]: stockApi.reducer,
    // ... add other reducers
})

const persistConfig = {
    key: 'root',
    storage,
    // Whitelist (Save specific reducers)
    // whitelist: ['yourReducer'],
    // Blacklist (Don't save specific reducers)
    // blacklist: ['someOtherReducer'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(stockApi.middleware),
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)
