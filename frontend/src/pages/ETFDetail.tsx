import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEtfControllerGetEtfBySymbolQuery } from '../services/beGeneratedApi'

const ETFDetailPage = () => {
    const { symbol } = useParams<{ symbol: string }>()
    const navigate = useNavigate()
    const { data: etf, isLoading, error } = useEtfControllerGetEtfBySymbolQuery(symbol || '')

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading ETF details</div>
    }

    return (
        <div className="p-4">
            <button
                onClick={() => navigate(-1)}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
            >
                Go Back
            </button>
            {etf ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">
                        {etf.name} ({etf.symbol})
                    </h1>
                    <div className="mb-4">
                        <p>
                            <strong>Asset Class:</strong> {etf.assetClass}
                        </p>
                        <p>
                            <strong>Company:</strong> {etf.etfCompany}
                        </p>
                        <p>
                            <strong>AUM:</strong> ${etf.aum?.toLocaleString()}
                        </p>
                        <p>
                            <strong>Expense Ratio:</strong> {etf.expenseRatio?.toFixed(2)}%
                        </p>
                        <p>
                            <strong>Inception Date:</strong> {etf.inceptionDate}
                        </p>
                        <p>
                            <strong>ISIN:</strong> {etf.isin}
                        </p>
                        <p>
                            <strong>Description:</strong> {etf.description}
                        </p>
                        <p>
                            <strong>Website:</strong>{' '}
                            <a
                                href={etf.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                            >
                                {etf.website}
                            </a>
                        </p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Performance</h2>
                        <p>
                            <strong>1Y Performance:</strong> {etf.performance1y?.toFixed(2)}%
                        </p>
                        <p>
                            <strong>3Y Performance:</strong> {etf.performance3y?.toFixed(2)}%
                        </p>
                        <p>
                            <strong>5Y Performance:</strong> {etf.performance5y?.toFixed(2)}%
                        </p>
                        <p>
                            <strong>10Y Performance:</strong> {etf.performance10y?.toFixed(2)}%
                        </p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Top Holdings</h2>
                        {etf.holders && etf.holders.length > 0 ? (
                            <ul>
                                {etf.holders.map((holder, index) => (
                                    <li key={index} className="mb-2">
                                        <strong>{holder.name}</strong> -{' '}
                                        {holder.sharesNumber.toLocaleString()} shares,{' '}
                                        {holder.weightPercentage.toFixed(2)}% of the ETF
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No holdings available.</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Sector Exposure</h2>
                        {etf.sectorsList && etf.sectorsList.length > 0 ? (
                            <ul>
                                {etf.sectorsList.map((sector, index) => (
                                    <li key={index} className="mb-2">
                                        <strong>{sector.industry}</strong> -{' '}
                                        {sector.exposure.toFixed(2)}%
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No sector information available.</p>
                        )}
                    </div>
                </div>
            ) : (
                <div>No ETF data found.</div>
            )}
        </div>
    )
}

export default ETFDetailPage
