import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { difference } from 'lodash';

export const titles = () => (state) => state.getIn(['titlesEditorRoot', 'titles']);
export const query = () => (state) => state.getIn(['form', 'FilterParams', 'values', 'filter']); // todo: why separate state root? use titlesEditorRoot.filterParams
export const selectedSubCategory = () => (state) => state.getIn(['titlesEditorRoot', 'selectedSubCategory']);
export const relations = () => (state) => state.getIn(['titlesEditorRoot', 'relations']);

export const selectedTitleId = () => (state) => state.getIn(['titlesEditorRoot', 'selectedTitle']);
export const selectedTitle = () => createSelector(
  selectedTitleId(),
  titles(),
  (selectedTitleId, titles) => {
    return titles.find(t => t.id === selectedTitleId);
  }
);

export const selectedTitleRelations = () => createSelector(
  selectedTitle(),
  titles(),
  relations(),
  (selectedTitle, titles, relations) => {
    if (!selectedTitle) {
      return [];
    }

    const relatedIds = relations.map(r => difference(r, [selectedTitle.id])[0]);
    const relatedTitles = relatedIds.map(id => titles.find(t => t.id === id));

    return relatedTitles.filter(r => r !== undefined);
  }
);

export const results = () => createSelector(
  titles(),
  query(),
  (titles, query) => {
    return titles.filter(t => t.name.toLowerCase().includes((query || '').trim()));
  });
