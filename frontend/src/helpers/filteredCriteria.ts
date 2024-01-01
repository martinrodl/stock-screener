import { StockCriteria, SimpleStockCriteria } from '../types/StockCriteria'

export const filteredCriteria = (stockCriteria: StockCriteria | SimpleStockCriteria) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.fromEntries(Object.entries(stockCriteria).filter(([_, value]) => value !== ''))
