// components/Layout.tsx
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout: FC = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-10">
                <Outlet /> {/* This will render the matched child routes */}
            </main>
        </div>
    )
}

export default Layout
