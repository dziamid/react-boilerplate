import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { difference } from 'lodash';
import { DEFAULT_PROXIMITY } from 'mocks/proximities';

export const titles = () => (state) => state.getIn(['titlesEditorRoot', 'titles']);
export const titlesTotal = () => createSelector(
  titles(),
  (titles) => titles.size
);

export const query = () => (state) => state.getIn(['form', 'TitleEditor', 'values', 'title']);
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

/**
 * Returns a list of jobTitleNeighbor objects
 *
 * jobTitleNeighbor objects embed a `name` property for simplicity
 *
 */
export const selectedTitleRelations = () => createSelector(
  selectedTitle(),
  titles(),
  relations(),
  (selectedTitle, titles, relations) => {
    if (!selectedTitle) {
      return [];
    }

    const relatedTitles = titles.filter(t => t.id !== selectedTitle.id);

    const createRelation = (title, neighbor) => ({
      jobTitleId: title.id,
      neighborId: neighbor.id,
      proximity: DEFAULT_PROXIMITY,
    });

    const getRelation = (title) => {
      return relations.find(r => r.jobTitleId === title.id);
    };

    return relatedTitles.map(title => {
      const relation = getRelation(title) || createRelation(selectedTitle, title);

      return { ...relation, name: title.name };
    });
  }
);

export const results = () => createSelector(
  titles(),
  query(),
  (titles, query) => {
    return titles.filter(t => t.name.toLowerCase().includes((query || '').trim()));
  });
