import { StockCriteria } from '../types/StockCriteria'

export const filteredCriteria = (stockCriteria: StockCriteria) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.fromEntries(Object.entries(stockCriteria).filter(([_, value]) => value !== ''))
