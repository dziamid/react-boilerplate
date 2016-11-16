/*
 *
 * SingleTitle reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_TITLE,
} from './constants';

const initialState = fromJS({});

function SingleTitleReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TITLE:
      return state.set();
    default:
      return state;
  }
}

export default SingleTitleReducer;
