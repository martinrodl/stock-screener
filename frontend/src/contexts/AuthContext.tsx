import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setCredentials, clearCredentials } from '../store/authSlice'

interface AuthContextType {
    isLoggedIn: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { accessToken } = useAppSelector((state) => state.auth)
    const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken)
    const dispatch = useAppDispatch()

    const login = () => {
        // Logic for login, setting token in Redux store
        dispatch(setCredentials({ accessToken: 'your-access-token' })) // Replace with actual token
    }

    const logout = () => {
        dispatch(clearCredentials())
        setIsLoggedIn(false)
    }

    useEffect(() => {
        setIsLoggedIn(!!accessToken)
    }, [accessToken])

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
