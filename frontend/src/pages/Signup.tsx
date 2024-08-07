import { useState } from 'react'
import { useUsersControllerRegisterMutation } from '../services/beGeneratedApi'
import { useAppDispatch } from '../hooks'
import { setCredentials } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [register, { isLoading }] = useUsersControllerRegisterMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const user = await register({ registerDto: { email, password, name } }).unwrap()
            dispatch(setCredentials(user))
            navigate('/')
        } catch (err) {
            console.error('Failed to register: ', err)
        }
    }

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={handleSignup} className="w-full max-w-sm">
                <div className="mb-4">
                    <input
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name"
                        className="border p-2 w-full"
                    />
                </div>
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
                    className="bg-green-500 text-white px-4 py-2 rounded w-full"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default Signup
