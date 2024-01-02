import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SymbolInputForm: React.FC = () => {
    const [symbol, setSymbol] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (symbol) {
            navigate(`/stock/${symbol}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-5">
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter Stock Symbol"
                className="mt-5 p-2 rounded-md bg-white text-gray-800 w-[168px]"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded-md"
            >
                Go to stock detail
            </button>
        </form>
    )
}

export default SymbolInputForm
