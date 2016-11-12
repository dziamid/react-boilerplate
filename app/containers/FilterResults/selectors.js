import { createSelector } from 'reselect';

/**
 * Direct selector to the FilterResults state domain
 */
const selectFilterResultsDomain = () => (state) => state.get('FilterResults');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FilterResults
 */

const selectFilterResults = () => createSelector(
  selectFilterResultsDomain(),
  (substate) => substate.toJS()
);

export default selectFilterResults;
export {
  selectFilterResultsDomain,
};
