/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';

import filterParams from '../FilterParams/reducer';
import filterResults from '../FilterResults/reducer';
import titlesEditor from './reducer';

/**
 * Creates the root reducer
 */
export default combineReducers({
  filterParams,
  filterResults,
  titlesEditor,
});
