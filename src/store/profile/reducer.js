import immutable from 'seamless-immutable';

import * as actions from './actionTypes';

const defaultState = {
  user: null,
  access: null
};

export const reducer = (state = immutable(defaultState), action) => {
  switch (action.type) {
    case actions.SET_USER:
      return state.merge({ user: action.payload });
    case actions.SET_ACCESS:
      return state.merge({ access: action.payload });
    case actions.CLEAR_PROFILE:
      return state.merge(defaultState);
    default:
      return state;
  }
};
