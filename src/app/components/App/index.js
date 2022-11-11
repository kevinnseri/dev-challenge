import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import AppRoutes from '../../../config/routes';
import { checkSession } from '../../../services/authServices.js';
import { setProfile } from '../../../store/profile/actions';

const App = () => {
  // Defines Redux store and dispatcher
  const profile = useSelector((store) => store.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    // Saves user info in localStorage
    const user = localStorage.getItem('user');
    const access = localStorage.getItem('access');
    const token = localStorage.getItem('token');
    if (user && token) {
      dispatch(setProfile(user, access));

      // Checks if session is valid
      checkSession()
        .then((session) => {
          if (session && session.access) {
            dispatch(setProfile(user, session.access));
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <AppRoutes profileAccess={profile.access ? profile.access : null} />
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
