import expect from 'expect';
import {
  defaultAction,
} from '../actions';
import {
  UPDATE_TITLE,
} from '../constants';

describe('SingleTitle actions', () => {
  describe('Default Action', () => {
    it('has a type of UPDATE_TITLE', () => {
      const expected = {
        type: UPDATE_TITLE,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
