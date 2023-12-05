import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const pages = [
    {
        key: 'home',
        title: 'Stock Screener',
        path: '/',
    },
    {
        key: 'criteria-list',
        title: 'Criteria List',
        path: '/criteria-list',
    },
    {
        key: 'graham-number-screener',
        title: 'Graham Number Screener',
        path: '/graham-number-screener',
    },
    {
        key: 'graham-rules-screener',
        title: 'Graham Rules Screener',
        path: '/graham-rules-screener',
    },
    {
        key: 'my-portfolio',
        title: 'My Portfolio',
        path: '/my-portfolio',
    },
    {
        key: 'long-term-recommendation',
        title: 'Long Term Recommendation',
        path: '/long-term-recommendation',
    },
    {
        key: 'short-or-quick-buy',
        title: 'Short or Quick Buy',
        path: '/short-or-quick-buy',
    },
]

const Sidebar: React.FC = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true)

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible)
    }

    return (
        <div
            className={`fixed top-0 left-0 h-screen bg-gray-800 text-white p-5 transition-width duration-300 ${
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
                My App
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
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
