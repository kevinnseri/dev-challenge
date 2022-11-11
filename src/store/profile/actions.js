import * as actionTypes from './actionTypes';

const setUser = (user) => ({
  type: actionTypes.SET_USER,
  payload: user
});

const setAccess = (token) => ({
  type: actionTypes.SET_ACCESS,
  payload: token
});

const clearAll = () => ({
  type: actionTypes.CLEAR_PROFILE
});

export const clearProfile = () => async (dispatch) => {
  dispatch(clearAll());
  localStorage.clear();
};

export const setProfile = (user, access) => async (dispatch) => {
  dispatch(setUser(user));
  dispatch(setAccess(access));
};
