import expect from 'chai';
import SingleTitleReducer from '../reducer';
import { fromJS } from 'immutable';

describe('SingleTitleReducer', () => {
  it('returns the initial state', () => {
    expect(SingleTitleReducer(undefined, {})).toEqual(fromJS({}));
  });
});
