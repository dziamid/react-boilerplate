/*
 *
 * FilterResults reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  UPDATE_RESULTS,
} from './constants';

const initialState = fromJS({
  results: [],
});

function FilterResultsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_RESULTS:
      return state.set('results', action.data);
    default:
      return state;
  }
}

export default FilterResultsReducer;
