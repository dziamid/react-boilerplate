import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

/**
 * Direct selector to the FilterResults state domain and form
 */
const selectFilterResultsDomain = () => (state) =>
  state.getIn(['titlesEditorRoot', 'filterResults'], fromJS({}));

const selectFilterParamsDomain = () => (state) =>
  state.getIn(['titlesEditorRoot', 'filterParams'], fromJS({}));

const selectFilterResultsForm = () => (state) => {
  return state.getIn(['form', 'filterResults'], {});
};

/**
 * Other specific selectors
 */
const selectResultsList = () => createSelector(
  selectFilterResultsDomain(),
  substate => substate.get('results')
);

/**
 * Default selector used by FilterResults
 */

const selectFilterResults = () => createSelector(
  selectFilterResultsDomain(),
  (substate) => substate.toJS()
);

export default selectFilterResults;
export {
  selectFilterResultsForm,
  selectResultsList,
};