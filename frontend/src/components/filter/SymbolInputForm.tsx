import React, { useState } from 'react'

interface SymbolInputFormProps {
    onSymbolChange: (symbol: string) => void
    initialSymbol: string
}

const SymbolInputForm: React.FC<SymbolInputFormProps> = ({ onSymbolChange, initialSymbol }) => {
    const [symbol, setSymbol] = useState<string>(initialSymbol)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSymbol(e.target.value)
        onSymbolChange(e.target.value)
    }

    return (
        <div className="flex flex-col">
            <label htmlFor="symbol" className="mb-2">
                Symbol
            </label>
            <input
                type="text"
                id="symbol"
                value={symbol}
                onChange={handleInputChange}
                className="p-2 border rounded"
                placeholder="Enter stock symbol"
            />
        </div>
    )
}

export default SymbolInputForm
