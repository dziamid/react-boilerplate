
import { fromJS } from 'immutable';

import {
  SET_SELECTED_TITLE,
} from 'containers/TitlesEditor/constants';

const initialState = fromJS({
  results: [],
});

function FilterResultsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TITLE:
      return state.set('selectedTitle', action.titleId);
    default:
      return state;
  }
}

export default FilterResultsReducer;
