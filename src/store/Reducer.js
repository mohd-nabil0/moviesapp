import {combineReducers} from 'redux';
import user from './UserReducer';
import movies from './MovieReducer';

export default combineReducers({
  user,
  movies,
});
