import { createSelector } from 'reselect';

const titles = () => (state) => state.getIn(['titlesEditorRoot', 'filterParams', 'titles']);
const query = () => (state) => state.getIn(['form', 'FilterParams', 'values', 'filter']); // todo: why separate state root? use titlesEditorRoot.filterParams
const selectedTitle = () => (state) => state.getIn(['titlesEditorRoot', 'filterResults', 'selectedTitle']);
const relations = () => (state) => state.getIn(['titlesEditorRoot', 'filterParams', 'relations']);

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
