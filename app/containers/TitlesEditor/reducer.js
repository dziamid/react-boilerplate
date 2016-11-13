/*
 *
 * TitlesEditor reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  titlesEditor: '',
});

const otherState = fromJS({
  a: 1,
  b: 2,
});

function titlesEditorReducer(state = initialState, action) {
  switch (action.type) {
    case 'app/FilterParams/FETCH_SUBCATEGORIES':
      return otherState;
    default:
      return state;
  }
}

export default titlesEditorReducer;
