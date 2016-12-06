import {Action} from 'redux';

export interface IAction extends Action {
  payload: any,
}

export function load(query: string): IAction {
  return {
    type: 'ADDRESS_AUTOCOMPLETE_LOAD',
    payload: query,
  };
}

export function show(suggestions: any[]): IAction {
  return {
    type: 'ADDRESS_AUTOCOMPLETE_SHOW',
    payload: suggestions,
  };
}
