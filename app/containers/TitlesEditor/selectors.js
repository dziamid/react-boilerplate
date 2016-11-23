import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { difference } from 'lodash';

export const titles = () => (state) => state.getIn(['titlesEditorRoot', 'titles']);
export const titlesTotal = () => createSelector(
  titles(),
  (titles) => titles.size
);

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
  (title, titles, relations) => {
    if (!title) {
      return [];
    }

    const titleRelations = relations.filter(r => r.jobTitleId === title.id);
    const relatedTitles = titleRelations.map(r => titles.find(t => t.id === r.neighborId));

    return titleRelations.map((r, i) => ({
      ...r,
      name: relatedTitles.get(i).name,
    }));
  }
);

export const results = () => createSelector(
  titles(),
  query(),
  (titles, query) => {
    return titles.filter(t => t.name.toLowerCase().includes((query || '').trim()));
  });
