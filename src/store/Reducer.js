import {combineReducers} from 'redux';
import user from './UserReducer';
import movies from './MovieReducer';
import languages from './LanguageReducer';

export default combineReducers({
  user,
  movies,
  languages,
});
