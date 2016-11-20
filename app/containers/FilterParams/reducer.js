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
  ADD_RELATION,
  REMOVE_RELATION,
  // UPDATE_PROXIMITY,
  UPDATE_SENIORITY,
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
  relations: [],
});

function filterParamsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUBCATEGORIES: {
      return state
        .set('loading', true)
        .set('error', false)
        .set('subCategories', [])
        .set('selectedSubCategory', false)
        .set('selectedCategory', action.categoryId);
    }

    case FETCH_SUBCATEGORIES_SUCCESS: {
      const subCats = parseMlabIds(action.subCategories);

      return state
        .set('loading', false)
        .set('subCategories', subCats);
    }

    case FETCH_SUBCATEGORIES_ERROR: {
      return state
        .set('error', action.error)
        .set('loading', false);
    }

    case FETCH_TITLES: {
      return state
        .set('loading', true)
        .set('error', false)
        .set('selectedSubCategory', action.subCategoryId)
        .set('titles', []);
    }

    case FETCH_TITLES_SUCCESS: {
      const titles = parseMlabIds(action.titles);

      return state
        .set('loading', false)
        .set('titles', titles);
    }

    case FETCH_TITLES_ERROR: {
      return state
        .set('error', action.error)
        .set('loading', false);
    }

    // case UPDATE_TITLE: {
    //   return state
    //     .set('loading', true)
    //     .set('error', false)
    //     .set('titleToUpdate', action.newTitle);
    // }
    //
    // case UPDATE_TITLE_SUCCESS: {
    //   // Get the title from the collection
    //   const titlesFromState = state.get('titles');
    //   const titleObj = _.find(titlesFromState, { _id: action.updatedTitle._id });
    //
    //   // Point the title object to the updated object
    //   // titleObj = action.updatedTitle;
    //   titleObj.seniority = 5;
    //
    //   return state
    //     .set('loading', false)
    //
    //     // Update the store with a deep clone of the titles
    //     .set('titles', titlesFromState);
    // }
    //
    // case UPDATE_TITLE_ERROR: {
    //   return state
    //     .set('error', action.error)
    //     .set('loading', false);
    // }

    case ADD_RELATION: {
      const [a, b] = action.titles; // ids
      let relations = state.get('relations');
      const exits = state.get('relations').find(r => r.indexOf(a) !== -1 && r.indexOf(b) !== -1);
      if (!exits) {
        relations = relations.push([a, b]);
      }

      return state.set('relations', relations);
    }

    case REMOVE_RELATION: {
      const [a, b] = action.titles; // ids
      let relations = state.get('relations');
      const relIndex = state.get('relations').findIndex(r => r.indexOf(a) !== -1 && r.indexOf(b) !== -1);
      if (relIndex !== -1) {
        relations = relations.remove(relIndex);
      }

      return state.set('relations', relations);
    }

    case UPDATE_SENIORITY: {
      const titleId = action.titleId;
      const seniority = action.seniority;
      const titles = state.get('titles');

      const titleObj = _.find(titles, { _id: titleId });
      titleObj.seniority = seniority;

      const clonedTitles = _.cloneDeep(titles);

      return state.set('titles', clonedTitles);
    }

    default:
      return state;
  }
}

export default filterParamsReducer;
