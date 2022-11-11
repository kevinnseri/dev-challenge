import { useDispatch } from 'react-redux';
import { clearProfile } from '../store/profile/actions';

// MOCK Login
export const logIn = (user, psw) =>
  new Promise((resolve, reject) => {
    if (user === 'admin' && psw === 'admin') {
      const tout = setTimeout(() => {
        localStorage.setItem('user', user);
        localStorage.setItem('token', 'tokenMock');
        localStorage.setItem('access', true);
        clearTimeout(tout);
        resolve({ access: true });
      }, 1000);
    } else {
      reject();
    }
  });

// MOCK Session Checker
export const checkSession = () =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    token === 'tokenMock' ? resolve({ access: true }) : reject(dispatch(clearProfile()));
  });
