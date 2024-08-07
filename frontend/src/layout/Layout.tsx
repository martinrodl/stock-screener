// components/Layout.tsx
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from '../components/Header'

const Layout: FC = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-2">
                <Header />
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
