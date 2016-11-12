import expect from 'expect';
import titlesEditorReducer from '../reducer';
import { fromJS } from 'immutable';

describe('titlesEditorReducer', () => {
  it('returns the initial state', () => {
    expect(titlesEditorReducer(undefined, {})).toEqual(fromJS({}));
  });
});
