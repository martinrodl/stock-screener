import { useState } from 'react'
import { useUsersControllerLoginMutation } from '../services/beGeneratedApi.ts'
import { useAppDispatch } from '../hooks'
import { setCredentials } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, { isLoading }] = useUsersControllerLoginMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const user = await login({ loginDto: { email, password } }).unwrap()

            dispatch(setCredentials(user))
            navigate('/')
        } catch (err) {
            console.error('Failed to login: ', err)
        }
    }

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin} className="w-full max-w-sm">
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="border p-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
