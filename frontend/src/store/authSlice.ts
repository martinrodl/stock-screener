import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    accessToken: string | null
    email: string | null
    name: string | null
}

const initialState: AuthState = {
    accessToken: null,
    email: null,
    name: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            {
                payload: { accessToken, email, name },
            }: PayloadAction<{ accessToken: string; email: string; name: string }>
        ) => {
            state.accessToken = accessToken
            state.email = email
            state.name = name
        },
        clearCredentials: (state) => {
            state.accessToken = null
            state.email = null
            state.name = null
        },
    },
})

export const { setCredentials, clearCredentials } = authSlice.actions

export default authSlice.reducer
