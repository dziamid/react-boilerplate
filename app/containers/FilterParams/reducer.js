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
  FILTER_RESULTS,
} from './constants';
import { fromJS } from 'immutable';

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
      const subCats = action.subCategories.map(sc => {
        return {
          _id: sc._id.$oid,
          name: sc.name,
        };
      });
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
        .set('titles', []);
    case FETCH_TITLES_SUCCESS:
      return state
        .set('loading', false)
        .set('titles', action.titles);
    case FETCH_TITLES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case FILTER_RESULTS:
      return state
        .set('filterText', action.filterText);
    default:
      return state;
  }
}

export default filterParamsReducer;
