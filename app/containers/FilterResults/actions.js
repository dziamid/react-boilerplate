/*
 *
 * FilterResults actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_RESULTS,
} from './constants';

import { getResults } from './mocks';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateResults() {
  return {
    type: UPDATE_RESULTS,
    data: getResults(),
  };
}
