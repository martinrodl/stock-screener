import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import SymbolInputForm from '../components/SymbolInputForm'
import { useAuth } from '../contexts/AuthContext'

const pages = [
    {
        key: 'simplecriteria-list',
        title: 'Simple Criteria List',
        path: '/',
    },
    {
        key: 'etf-list',
        title: 'ETF List',
        path: '/etfs/page/1',
    },
    {
        key: 'stock-screener',
        title: 'Create Filter',
        path: '/stock-screener',
    },

    {
        key: 'criteria-list',
        title: 'Criteria List',
        path: '/criteria-list',
    },
]

const loggedPages = [
    {
        key: 'portfolio-list',
        title: 'Portfolio List',
        path: '/portfolio-list',
    },
    {
        key: 'consider-list',
        title: 'Consider List',
        path: '/consider-list',
    },
    {
        key: 'user-filters',
        title: 'User Filters',
        path: '/user-filters',
    },
]

const Sidebar: React.FC = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true)
    const { isLoggedIn } = useAuth()

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible)
    }

    return (
        <div
            className={`top-0 left-0 h-screen bg-gray-800 text-white p-5 transition-width duration-300 ${
                isSidebarVisible ? 'w-64' : 'w-24'
            }`}
        >
            <button
                onClick={toggleSidebar}
                className="mb-5 text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            >
                {isSidebarVisible ? '☰' : '☰'}
            </button>

            <h1
                className={`text-xl font-bold mb-5 transition-opacity duration-300 ${
                    !isSidebarVisible && 'opacity-0'
                }`}
            >
                Stock Screener - V{APP_VERSION}
            </h1>
            <nav>
                <ul>
                    {pages.map((item) => (
                        <li
                            key={item.key}
                            className={`mb-2 transition-opacity duration-300 ${
                                !isSidebarVisible && 'opacity-0'
                            }`}
                        >
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
                            >
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                    {isLoggedIn &&
                        loggedPages.map((item) => (
                            <li
                                key={item.key}
                                className={`mb-2 transition-opacity duration-300 ${
                                    !isSidebarVisible && 'opacity-0'
                                }`}
                            >
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
                                >
                                    {item.title}
                                </NavLink>
                            </li>
                        ))}
                </ul>
            </nav>
            <div className={`${!isSidebarVisible && 'opacity-0'}`}>
                <SymbolInputForm />
            </div>
        </div>
    )
}

export default Sidebar
