import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.scss';
import { removeWhiteSpaces } from '../../../utils/stringUtils';
import { logIn } from '../../../services/authServices';
import { setProfile } from '../../../store/profile/actions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Login = () => {
  // Defines Redux dispatcher
  const dispatch = useDispatch();

  // Hook states
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Sets document title
  useEffect(() => {
    document.title = 'Bands APP - Login';
  });

  // Input change handlers
  const handleUserChange = (event) => {
    setUser(removeWhiteSpaces(event.target.value));
    setError(false);
  };
  const handlePasswordChange = (event) => {
    setPassword(removeWhiteSpaces(event.target.value));
    setError(false);
  };

  // Form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    logIn(user, password)
      .then((response) => {
        if (response) {
          const { access } = response;
          if (access) {
            dispatch(setProfile(user, access));
          } else {
            setSubmitted(false);
          }
        } else setSubmitted(false);
      })
      .catch(() => {
        setError(true);
        setSubmitted(false);
      });
  };

  return (
    <Fragment>
      <main>
        <div className="login-container">
          <div className="login-card">
            <h2>Login</h2>
            <h3>Enter your credentials</h3>
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                name="username"
                value={user}
                onChange={handleUserChange}
                type="text"
                placeholder="Username"
              />
              <input
                name="password"
                onChange={handlePasswordChange}
                type="password"
                placeholder="Password"
              />

              <div className="resp-message">
                {error ? (
                  <div className="login-error">
                    <ErrorOutlineIcon className="logo-error" type={ErrorOutlineIcon} />
                    <h2>Usuario o Contraseña incorrecta</h2>
                  </div>
                ) : submitted ? (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                ) : null}
              </div>

              <button aria-label="login button">LOGIN</button>

              <a href="#">Forgot your password?</a>
            </form>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Login;
