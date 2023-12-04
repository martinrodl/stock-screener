// components/Sidebar.tsx
import React from 'react'
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
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-5">
            <h1 className="text-xl font-bold mb-5">My App</h1>
            <nav>
                <ul>
                    {pages.map((item) => (
                        <li key={item.key} className="mb-2">
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
