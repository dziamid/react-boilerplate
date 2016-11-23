/*
 *
 * SingleTitle reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({});

function SingleTitleReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default SingleTitleReducer;
