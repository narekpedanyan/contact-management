import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Sidebar from "./components/Sidebar/Sidebar.tsx";

const Layout: React.FC = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
