/*
 *
 * FilterResults reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_SELECTED_TITLE,
} from './constants';

const initialState = fromJS({
  results: [],
});

function FilterResultsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_SELECTED_TITLE:
      return state.set('selectedTitle', action.titleId);
    default:
      return state;
  }
}

export default FilterResultsReducer;
