import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';

import { reducer as profileReducer } from './profile/reducer';

const reducers = combineReducers({
  profile: profileReducer,
  form
});

const middlewares = [];
const enhancers = [];

middlewares.push(thunk);

enhancers.push(applyMiddleware(...middlewares));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle

const store = createStore(reducers, composeEnhancers(...enhancers));

export default store;
