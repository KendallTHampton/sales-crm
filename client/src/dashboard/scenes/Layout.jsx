import React, {useState} from 'react'
import Box from '@mui/material/Box';
import {useMediaQuery} from '@mui/material';
import {useSelector} from 'react-redux';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {Outlet} from 'react-router-dom';



const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const userObject = useSelector((state) => state.user.currentUser)

    const drawerWidth = isNonMobile ? 240 : 180;


    return (
        <Box display="flex" width="100%" height="100%" >
            <Sidebar
                user={userObject || {}}
                isNonMobile={isNonMobile}
                drawerWidth={drawerWidth}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box
                flex={1}
                maxWidth={isSidebarOpen ? `calc(100vw - ${ drawerWidth }px)` : "100vw"}
            >
                <Navbar
                    isNonMobile={isNonMobile}
                    drawerWidth={drawerWidth}
                    user={userObject || {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout
