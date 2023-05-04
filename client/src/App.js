import React, {useEffect, useState} from 'react';
import './Global.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";


// Pages Routes
import Home from './website/home/Home';
import Navbar from './website/components/Navbar';
import Profile from './website/profile/Profile';

// Auth Routes
import Login from './website/authenticationPages/Login';
import Signup from './website/authenticationPages/Signup';

// DashBoard Routes
import Dashboard from './dashboard/Dashboard';
import Tickets from './dashboard/scenes/Tickets';
import TicketDetails from './dashboard/scenes/TicketDetails';

import {useSelector, useDispatch} from 'react-redux';
import {auth} from './firebase';
import {signUserOut, setCurrentUser} from "./reduxSlices/User";
import jwtDecode from 'jwt-decode';
import {useRefreshTokenMutation, useLoginUserMutation} from './reduxSlices/Api';
import User from './dashboard/scenes/UserDetails';
import Contacts from './dashboard/scenes/Contacts';
import Campaigns from './dashboard/scenes/Campaigns';
import CampaignDetails from './dashboard/scenes/CampaignDetails';
import CreateCampaign from './dashboard/scenes/CreateCampaign';
import Admins from './dashboard/scenes/Admins';
import AdminDetails from './dashboard/scenes/AdminDetails';


function App() {
  const dispatch = useDispatch();
  const [refreshTokenFunction] = useRefreshTokenMutation();
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(true);


  const checkLoggedInStatus = async () => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      return Promise.resolve();
    }
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now();

    //Chech if the token isn't expired
    if (currentTime < decodedToken.exp * 1000) {
      const user = decodedToken.user;
      dispatch(setCurrentUser(user));

    } else {
      // If the token is expired, we need to refresh it
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        // send the refresh token to the server
        const response = await refreshTokenFunction({refreshToken});
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        const newDecodedToken = jwtDecode(newAccessToken);
        const user = newDecodedToken.user;
        await loginUser({email: user[0].email});
        dispatch(setCurrentUser(user[0]));
      } catch (error) {
        console.log(error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
  }

  useEffect(() => {
    checkLoggedInStatus().finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps




  const userObject = useSelector((state) => state.user.currentUser)

  const userIsLoggedIn = userObject ? userObject : false
  const userIsAdmin = userIsLoggedIn && userIsLoggedIn.isAdmin



  // Protecting dashboard routes
  function ProtectedRoute({children, userIsAdmin}) {
    return userIsAdmin ? children : <Navigate to="/" />;
  }




  return (
    <Router>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          {/* Nabar Only Shows Where I Want It To (Not on Dashboard or any child) */}
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* MAKE DASHBOARD PRIVATE */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute userIsAdmin={userIsAdmin}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Tickets */}
            <Route index element={<Navigate to="tickets" />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="tickets/:ticketId" element={<TicketDetails />} />
            <Route path="tickets/:ticketId/edit" element={<TicketDetails />} />
            <Route path="user/:userId" element={<User />} />
            <Route path="contacts" element={<Contacts />} />
            {/* Campaigns */}
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="campaign/:campaignId" element={<CampaignDetails />} />
            <Route path='campaigns/create' element={<CreateCampaign />} />
            {/* Admins */}
            <Route path="admins" element={<Admins />} />
            <Route path="admin/:adminId" element={<AdminDetails />} />
          </Route>
        </Routes>
      )}
    </Router>
  );
}


export default App;


// The Dashboard Route is protected and only users who are admin can access it (ProtectedRoute Function). We are using the Dashboard Component Which ultimately just contains the Layour of the Navbar and Sidebar we are able to pass in other routes EX. (dashboard/tickets) 