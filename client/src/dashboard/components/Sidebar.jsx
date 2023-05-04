import {Box, Divider, Drawer, IconButton, List, Typography} from '@mui/material'
import React, {useState} from 'react'

// MUI
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

/* ICONS  */
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkIcon from '@mui/icons-material/Work';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import CampaignIcon from '@mui/icons-material/Campaign';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import {useNavigate} from 'react-router-dom';
import {useLocation} from "react-router-dom";

const routes = [
    {
        categoryName: "General",
        routes: [
            {
                path: "tickets",
                name: "Tickets",
                icon: <ConfirmationNumberIcon />,
            },
            {
                path: "contacts",
                name: "Contacts",
                icon: <ContactPageIcon />,
            },
            {
                path: "campaigns",
                name: "Campaigns",
                icon: <CampaignIcon />,
            },
        ],
    },
    {
        categoryName: "Management",
        routes: [
            {
                path: "admins",
                name: "Admins",
                icon: <SupervisorAccountIcon />,
            },
        ],
    },
];


const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {


    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(location.pathname.split('/')[2] || 'tickets');

    return (
        <Box
            component="nav"
            width={isSidebarOpen ? drawerWidth : 0}
        >
            <Box width="100%" height="auto" >
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    background="black"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth, // Update the width value here
                            boxSizing: 'border-box',
                            background: 'rgba(60, 60, 68, 1)',
                            color: '#52F4EB',
                            boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.6)",
                        },
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 1.5rem',
                        height: "5rem",
                        justifyContent: "space-between"
                    }}>
                        <h2
                            style={{
                                color: 'white',
                                fontSize: `${ isNonMobile ? '2.5rem' : '1.5rem' }`
                            }}
                        >
                            Digitell
                        </h2>

                        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <ChevronLeft
                                sx={{
                                    color: '#fff',
                                }}

                            />
                        </IconButton>

                    </Box>
                    <Divider
                        sx={{
                            marginBottom: '2rem',
                        }}
                    />
                    {
                        routes.map((category) => {
                            return (
                                <Box
                                    key={category.categoryName}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        color: "#5de8e0",
                                        marginBottom: "2rem",
                                    }}
                                >
                                    <Typography
                                        variant="p"
                                        padding="0rem 1rem"
                                        sx={{
                                            color: "#b1b1b1",
                                        }}
                                    >
                                        {category.categoryName}
                                    </Typography>
                                    <Divider
                                        sx={{
                                            background: "rgba(151, 151, 151, 0.3)",
                                            marginTop: ".25rem",
                                        }}
                                    />
                                    <List
                                        sx={{
                                            padding: 0,
                                        }}
                                    >
                                        {category.routes.map((route) => (
                                            <ListItem
                                                key={route.name}
                                                disablePadding
                                                sx={{
                                                    "& .MuiListItemButton-root": {
                                                        padding: ".5rem 1rem",
                                                        background:
                                                            active === route.path
                                                                ? "rgba(0, 0, 0, .4)"
                                                                : "transparent",
                                                    },

                                                    "& .MuiListItemButton-root:before": {
                                                        content: '""',
                                                        position: "absolute",
                                                        left: 0,
                                                        top: 0,
                                                        height: "100%",
                                                        width: "4px",
                                                        background:
                                                            active === route.path ? "#1BC9AA" : "transparent",
                                                    },

                                                    "& .MuiListItemButton-root:hover": {
                                                        background: "rgba(0, 0, 0, .8)",
                                                    },
                                                }}
                                            >
                                                <ListItemButton
                                                    onClick={() => {
                                                        navigate(route.path);
                                                        setActive(route.path);
                                                    }}
                                                >
                                                    <ListItemIcon
                                                        sx={{
                                                            color: "#5de8e0",
                                                        }}
                                                    >
                                                        {route.icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={route.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            );
                        })
                    }

                </Drawer>
            </Box>
        </Box >
    )
}

export default Sidebar