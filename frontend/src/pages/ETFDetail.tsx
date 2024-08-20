import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEtfControllerGetEtfBySymbolQuery } from '../services/beGeneratedApi'
import EtfInfoTable from '../components/EtfInfoTable'

const EtfDetail = () => {
    // Extract the ETF symbol from the route parameters
    const { symbol } = useParams()

    // Initialize the navigate function
    const navigate = useNavigate()

    // Fetch the ETF data using the custom hook
    const { data, error, isLoading } = useEtfControllerGetEtfBySymbolQuery({ symbol: symbol ?? '' })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Back
            </button>

            <h1>
                {data.name} ({data.symbol})
            </h1>
            <p>{data.description}</p>

            <h2>Key Information</h2>
            {/* Pass ETF data to EtfInfoTable component */}
            <EtfInfoTable
                assetClass={data.assetClass}
                inceptionDate={data.inceptionDate}
                expenseRatio={data.expenseRatio}
                avgVolume={data.avgVolume}
                nav={data.nav}
                navCurrency={data.navCurrency}
                aum={data.aum}
                holdingsCount={data.holdingsCount}
                domicile={data.domicile}
                etfCompany={data.etfCompany}
                isin={data.isin}
                cusip={data.cusip}
            />

            <h2>Sector Exposure</h2>
            <ul>
                {data.sectorsList.map((sector) => (
                    <li key={sector._id}>
                        {sector.industry}: {sector.exposure}%
                    </li>
                ))}
            </ul>

            <h2>Top Holdings</h2>
            <ul>
                {data.holders.slice(0, 10).map((holding) => (
                    <li key={holding._id}>
                        {holding.name} ({holding.asset}): {holding.weightPercentage}% -{' '}
                        {holding.marketValue.toLocaleString()} USD
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EtfDetail
