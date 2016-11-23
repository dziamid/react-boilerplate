
import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectFilterParamsDomain = () => (state) =>
  state.getIn(['titlesEditorRoot'], fromJS({}));

export const selectFilterParams = () => createSelector(
  selectFilterParamsDomain(),
  (substate) => substate.toJS()
);

export const titles = () => (state) => state.getIn(['titlesEditorRoot', 'titles']);
export const query = () => (state) => state.getIn(['form', 'FilterParams', 'values', 'filter']); // todo: why separate state root? use titlesEditorRoot.filterParams
export const selectedTitle = () => (state) => state.getIn(['titlesEditorRoot', 'selectedTitle']);
export const relations = () => (state) => state.getIn(['titlesEditorRoot', 'relations']);

export const results = () => createSelector(
  titles(),
  query(),
  (titles, query) => {
    return titles.filter(t => t.name.toLowerCase().includes((query || '').trim()));
  });
