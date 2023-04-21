import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {AppBar, Avatar, Menu, MenuItem} from '@mui/material';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signUserOut} from '../../reduxSlices/User.jsx';
import {useNavigate} from 'react-router-dom';


const Navbar = (
    {
        drawerWidth,
        isSidebarOpen,
        setIsSidebarOpen,
        isNonMobile
    }
) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const userObject = useSelector((state) => state.user.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    return (
        <AppBar
            sx={{
                color: 'black',
                backgroundColor: "white",
                height: "5rem",
                display: "flex",
                width: isSidebarOpen ? `calc(100% - ${ drawerWidth }px)` : "100%",
                marginLeft: isSidebarOpen ? `${ drawerWidth }px` : "0",
                transition: "width 0.2s",
                justifyContent: "center",
            }}
        >
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                {/* SIDEBAR TOGGLE */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: ".5rem",

                        '& .MuiIconButton-root': {
                            margin: "0",
                        },
                    }}
                >
                    {!isSidebarOpen &&
                        <IconButton
                            aria-label="open drawer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            edge="start"
                            sx={{mr: 2}}
                        >
                            <MenuIcon
                                sx={{
                                    'MuiButtonBase-root': {
                                        margin: "0",
                                    },
                                }}
                            />
                        </IconButton>
                    }
                    {isNonMobile &&
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: ".5rem",
                            }}
                        >

                            <input type="text" placeholder="Search"
                                style={{
                                    width: "15rem",
                                    height: "2rem",
                                    borderRadius: "1rem",
                                    border: "none",
                                    outline: "none",
                                    paddingLeft: "1rem",
                                    fontSize: "1rem",
                                    backgroundColor: "#f2f2f2",
                                }}
                            />
                            <SearchIcon
                                edge="start"
                                sx={{
                                    cursor: "pointer",
                                }}
                            />
                        </Box>
                    }
                </Box>
                {/* USER PROFILE */}
                <Box
                    sx={{
                        display: "flex",
                        gap: '1rem',
                        alignItems: "center",
                    }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        sx={{
                            height: isNonMobile ? '40px' : '20px',
                            width: isNonMobile ? '40px' : '20px',
                        }}
                    >
                        <Avatar

                        >
                            {userObject.firstName.split('')[0]}
                        </Avatar>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >

                        <MenuItem onClick={() => setAnchorEl(null)}>
                            <Link to='/'>
                                Home
                            </Link>
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null)
                                localStorage.removeItem('user')
                                dispatch(signUserOut())
                                navigate('/')
                            }}
                        >
                            <Link to='/'>
                                Logout
                            </Link>
                        </MenuItem>
                    </Menu>
                    {/* USER */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: "0",

                        }}>
                        <p
                            style={{
                                fontSize: isNonMobile ? '1rem' : ".75rem"
                            }}
                        >
                            {userObject.firstName}
                        </p>
                        <p
                            style={{
                                fontSize: isNonMobile ? '1rem' : ".75rem"
                            }}
                        >
                            {userObject.lastName}</p>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Navbar