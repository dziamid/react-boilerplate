/*
 *
 * FilterParams Reducer
 *
 */

import {
  FETCH_SUBCATEGORIES,
  FETCH_SUBCATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_ERROR,
  FETCH_TITLES,
  FETCH_TITLES_SUCCESS,
  FETCH_TITLES_ERROR,
  UPDATE_TITLE,
  UPDATE_TITLE_SUCCESS,
  UPDATE_TITLE_ERROR,
  ADD_RELATION,
} from './constants';
import { fromJS } from 'immutable';
import { parseMlabIds } from 'utils/api';
import * as _ from 'lodash';

// The initial state
const initialState = fromJS({
  loading: false,
  error: false,
  categories: [],
  subCategories: [],
  titles: [],
  selectedCategory: false,
  selectedSubCategory: false,
  filterText: '',
  titleToUpdate: false,
});

function filterParamsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUBCATEGORIES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('subCategories', [])
        .set('selectedSubCategory', false)
        .set('selectedCategory', action.categoryId);
    case FETCH_SUBCATEGORIES_SUCCESS:
      const subCats = parseMlabIds(action.subCategories);

      return state
        .set('loading', false)
        .set('subCategories', subCats);
    case FETCH_SUBCATEGORIES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case FETCH_TITLES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('selectedSubCategory', action.subCategoryId)
        .set('titles', []);
    case FETCH_TITLES_SUCCESS:
      const titles = parseMlabIds(action.titles);

      return state
        .set('loading', false)
        .set('titles', titles);
    case FETCH_TITLES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    // case FILTER_RESULTS:
    //   return state
    //     .set('filterText', action.filterText);
    case UPDATE_TITLE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('titleToUpdate', action.newTitle);
    case UPDATE_TITLE_SUCCESS:
      // Get the title from the collection
      const titlesFromState = state.get('titles');
      let titleObj = _.find(titlesFromState, {_id: action.updatedTitle._id});

      // Point the title object to the updated object
      // titleObj = action.updatedTitle;
      titleObj.seniority = 5;

      return state
        .set('loading', false)

        // Update the store with a deep clone of the titles
        .set('titles', titlesFromState);
    case UPDATE_TITLE_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);

    case ADD_RELATION:
      // Get the title from the collection
      const titles2 = state.get('titles');
      let title = _.find(titles2, {_id: action.titleId});

      title.relations = title.relations || [];
      title.relations.push(action.rel);

      return state
        .set('loading', false)

        // Update the store with a deep clone of the titles
        .set('titles', titles2);

    default:
      return state;
  }
}

export default filterParamsReducer;
