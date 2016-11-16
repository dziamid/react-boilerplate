import expect from 'expect';
import {
  defaultAction,
} from '../actions';
import {
  DEFAULT_ACTION,
} from '../constants';

describe('FilterParams actions', () => {
  describe('Default Action', () => {
    it('has a type of UPDATE_TITLE', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
