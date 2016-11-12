import { createSelector } from 'reselect';

/**
 * Direct selector to the FilterParams state domain
 */
const selectFilterParamsDomain = () => (state) => state.get('FilterParams');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FilterParams
 */

const selectFilterParams = () => createSelector(
  selectFilterParamsDomain(),
  (substate) => substate.toJS()
);

export default selectFilterParams;
export {
  selectFilterParamsDomain,
};
