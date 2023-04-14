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
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase';
import {signUserOut, setCurrentUser} from "./reduxSlices/User";
import User from './dashboard/scenes/UserDetails';









function App() {
  const dispatch = useDispatch();

  // Auth State listener to check if user is logged in. If so, set user in redux store
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userObject = localStorage.getItem('user')
      JSON.parse(userObject)
      dispatch(setCurrentUser(userObject))
    }
    else {
      localStorage.removeItem('user')
      dispatch(signUserOut())
    }
  })



  const userObject = useSelector((state) => state.user.currentUser)
  const [userState, setUserState] = useState('')
  const userIsLoggedIn = userObject ? userObject : false
  const userIsAdmin = userIsLoggedIn && userIsLoggedIn.isAdmin === true ? true : false




  useEffect(() => {
    setUserState(userIsAdmin)
  }, [userIsAdmin])

  // Protecting dashboard routes
  function ProtectedRoute({children, userIsAdmin}) {
    return JSON.parse(localStorage.getItem('user')).isAdmin ? children : <Navigate to="/" />;
  }

  // Modal State


  return (
    <Router>
      <Routes>
        {/* Nabar Only Shows Where I Want It To (Not on Dashboard or any child)*/}
        <Route element={<Navbar />} >
          <Route path="/" element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        {/*MAKE DASHBOARD PRIVATE*/}

        <Route path="/dashboard/*" element={
          <ProtectedRoute userIsAdmin={userIsAdmin}>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="tickets" />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="tickets/:ticketId" element={<TicketDetails />} />
          <Route path="tickets/:ticketId/edit" element={<TicketDetails />} />
          <Route path="user/:userId" element={<User />} />
          <Route path='leads' element={<div>Leads</div>} />

          <Route path='Settings' element={<div>Settings</div>} />

        </Route>
      </Routes>
    </Router>
  );
}


export default App;


// The Dashboard Route is protected and only users who are admin can access it (ProtectedRoute Function). We are using the Dashboard Component Which ultimately just contains the Layour of the Navbar and Sidebar we are able to pass in other routes EX. (dashboard/tickets) 