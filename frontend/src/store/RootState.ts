// In your store or a separate types file
import { store } from './index'

export type RootState = ReturnType<typeof store.getState>
