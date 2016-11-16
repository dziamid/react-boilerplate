/*
 *
 * FilterResults actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_SELECTED_TITLE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setSelectedTitle(titleId) {
  return {
    type: SET_SELECTED_TITLE,
    titleId
  };
}
