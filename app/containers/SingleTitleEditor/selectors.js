import { createSelector } from 'reselect';

/**
 * Direct selector to the SingleTitle state domain
 */
const selectSingleTitleDomain = () => (state) => state.get('SingleTitle');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SingleTitle
 */

const selectSingleTitle = () => createSelector(
  selectSingleTitleDomain(),
  (substate) => substate.toJS()
);

export default selectSingleTitle;
export {
  selectSingleTitleDomain,
};
