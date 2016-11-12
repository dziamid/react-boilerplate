import expect from 'expect';
import FilterParamsReducer from '../reducer';
import { fromJS } from 'immutable';

describe('FilterParamsReducer', () => {
  it('returns the initial state', () => {
    expect(FilterParamsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
