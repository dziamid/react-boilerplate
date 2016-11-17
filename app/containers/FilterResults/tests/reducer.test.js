import expect from 'chai';
import FilterResultsReducer from '../reducer';
import { fromJS } from 'immutable';

describe('FilterResultsReducer', () => {
  it('returns the initial state', () => {
    expect(FilterResultsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
