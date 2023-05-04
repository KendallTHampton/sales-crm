import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './Navbar.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {signUserOut} from '../../reduxSlices/User';
import {Outlet} from 'react-router-dom';
import {
    Menu,
    IconButton,
    MenuItem,
    SwipeableDrawer,
    useMediaQuery,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const smallScreen = useMediaQuery('(max-width: 768px)');
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const userObject = useSelector((state) => state.user.currentUser);
    const userIsLoggedIn = userObject ? userObject : false
    const userIsAdmin = userIsLoggedIn && userIsLoggedIn.isAdmin


    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };



    const navLinks = (
        <>
            <Link to='/'>Home</Link>
            <Link to='/'>Team</Link>
            <Link to='/'>Contact</Link>
            {!userIsLoggedIn &&
                <Link to='/login'>
                    {' '}
                    <button className={styles.button}>Sign In</button>
                </Link>
            }
            {userIsLoggedIn && (
                <div className={styles.accountIconWrapper}>
                    <IconButton
                        className={styles.account}
                        size='large'
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        sx={{
                            height: "40px",
                            width: "40px",
                        }}
                    >
                        <AccountCircle
                            sx={{
                                color: "black",

                                transition: "all 0.25s ease-in-out",
                            }}
                        />
                    </IconButton>
                    <Menu
                        id='menu-appbar'
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        sx={{
                            '& .MuiMenu-list ': {
                                paddingBottom: '0rem',
                            },

                            '& .MuiMenu-list a': {
                                color: 'var(--primary-color)',
                            }

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
                            <Link to='/' >Profile</Link>
                        </MenuItem>
                        {userIsAdmin && (
                            <MenuItem onClick={() => setAnchorEl(null)}>
                                <Link to='/Dashboard'>Dashboard</Link>
                            </MenuItem>
                        )}


                        <MenuItem
                            sx={{
                                borderTop: '1px solid #ebebeb',
                            }}
                            onClick={() => {
                                setAnchorEl(null);
                                localStorage.removeItem('user');
                                dispatch(signUserOut());
                            }

                            }>

                            <Link to='/'
                                style={{
                                    color: 'var(--secondary-color)'

                                }}
                            >
                                Log Out
                            </Link>
                        </MenuItem>
                    </Menu>
                </div>
            )}
        </>
    );

    return (
        <>
            <div className={styles.navbar}>
                <Link to='/'>
                    <h2 className={styles.navbar__logo}>DigiTell</h2>
                </Link>
                {smallScreen ? (
                    <>
                        <IconButton
                            edge='end'
                            color='inherit'
                            aria-label='menu'
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <SwipeableDrawer
                            anchor='right'
                            open={drawerOpen}
                            onClose={handleDrawerToggle}
                            onOpen={handleDrawerToggle}
                        >
                            <div className={styles.drawer}>{navLinks}</div>
                        </SwipeableDrawer>
                    </>
                ) : (
                    <div className={styles.navbar__links}>{navLinks}</div>
                )}
            </div>
            <Outlet />
        </>
    );
}

export default Navbar;
