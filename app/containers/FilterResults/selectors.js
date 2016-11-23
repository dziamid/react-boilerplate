import { createSelector } from 'reselect';

const titles = () => (state) => state.getIn(['titlesEditorRoot', 'titles']);
const query = () => (state) => state.getIn(['form', 'FilterParams', 'values', 'filter']); // todo: why separate state root? use titlesEditorRoot.filterParams
const selectedTitle = () => (state) => state.getIn(['titlesEditorRoot', 'selectedTitle']);
const relations = () => (state) => state.getIn(['titlesEditorRoot', 'relations']);

const results = () => createSelector(
  titles(),
  query(),
  (titles, query) => {
    return titles.filter(t => t.name.toLowerCase().includes((query || '').trim()));
  });


export {
  titles,
  results,
  selectedTitle,
  relations,
};
