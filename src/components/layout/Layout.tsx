import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './Header'

export default function Layout() {
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ backgroundColor: 'white' }}>
            <Header onClick={handleViewSidebar} />
            <Box sx={{ marginLeft: sidebarOpen ? '240px' : '0', transition: 'margin 0.3s' }}>
                <Outlet />
            </Box>
        </Box>
    );
}