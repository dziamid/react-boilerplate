import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

/**
 * Direct selector to the FilterParams state domain
 */
const selectFilterParamsDomain = () => (state) =>
  state.getIn(['titlesEditorRoot'], fromJS({}));


/**
 * Other specific selectors
 */


/**
 * Default selector used by FilterParams
 */

const selectLoadingState = () => createSelector(
  selectFilterParamsDomain(),
  (fp) => {
    return {
      loading: fp.get('loading'),
      error: fp.get('error'),
    };
  }
);

const selectFilterParams = () => createSelector(
  selectFilterParamsDomain(),
  (substate) => substate.toJS()
);

export default selectFilterParams;
export {
  selectFilterParamsDomain,
};
