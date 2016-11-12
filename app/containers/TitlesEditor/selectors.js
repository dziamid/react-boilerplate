import { createSelector } from 'reselect';

/**
 * Direct selector to the titlesEditor state domain
 */
const selectTitlesEditorDomain = () => (state) => state.get('titlesEditor');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TitlesEditor
 */

const selectTitlesEditor = () => createSelector(
  selectTitlesEditorDomain(),
  // (substate) => substate.toJS()
);

export default selectTitlesEditor;
export {
  selectTitlesEditorDomain,
};
