import { React, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.scss';
import LogoutIcon from '@mui/icons-material/Logout';
import { clearProfile } from '../../../store/profile/actions';

const Navbar = () => {
  // Defines dispatcher and obtains profile from store
  const profile = useSelector((store) => store.profile);
  const dispatch = useDispatch();

  // Session handler on close
  const handleSessionClose = () => {
    localStorage.clear();
    dispatch(clearProfile());
  };

  return (
    <Fragment>
      <nav>
        <a href="/" aria-label="home logo button">
          <div className="nav-logo"></div>
        </a>
        {profile.access ? (
          <button
            className="btn-logout"
            aria-label="logout button"
            onClick={() => handleSessionClose()}>
            <LogoutIcon className="logo-logout" type={LogoutIcon} />
          </button>
        ) : null}
      </nav>
    </Fragment>
  );
};

export default Navbar;
