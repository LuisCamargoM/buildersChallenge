import { combineReducers } from 'redux';
import { locationReducer } from './reducers';

// Redux: Root Reducer
export const rootReducer = combineReducers({
  location: locationReducer,
});
