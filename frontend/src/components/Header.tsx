import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks'
// import { useUsersControllerLogoutMutation } from '../services/beGeneratedApi'
import { clearCredentials } from '../store/authSlice'

const Header: React.FC = () => {
    const { name, accessToken } = useAppSelector((state) => state.auth)
    // const [logout, { isLoading: isLogoutLoading }] = useUsersControllerLogoutMutation()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            dispatch(
                clearCredentials({
                    name: null,
                    accessToken: null,
                    email: null,
                })
            )
            // await logout().unwrap()
            navigate('/login')
        } catch (error) {
            console.error('Failed to logout:', error)
            alert('Logout failed')
        }
    }

    return (
        <header className="p-4 text-white flex justify-between items-center">
            <div>
                <a href="/" className="mr-4 text-white">
                    Home
                </a>
            </div>
            {accessToken ? (
                <div className="flex items-center">
                    <span className="mr-6 text-black">Hi, {name}</span>
                    <button
                        onClick={handleLogout}
                        // disabled={isLogoutLoading}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Signup
                    </button>
                </div>
            )}
        </header>
    )
}

export default Header
