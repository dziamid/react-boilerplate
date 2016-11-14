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


function titlesEditorReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default titlesEditorReducer;
