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
  FETCH_TITLE_RELATIONS_SUCCESS,
  ADD_RELATION,
  REMOVE_RELATION,
  UPDATE_PROXIMITY,
  UPDATE_SENIORITY,
} from './constants';
import { fromJS, List } from 'immutable';
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
      const subCats = action.subCategories;

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
      const titles = action.titles;

      return state
        .set('loading', false)
        .set('titles', titles);
    }

    case FETCH_TITLES_ERROR: {
      return state
        .set('error', action.error)
        .set('loading', false);
    }

    case FETCH_TITLE_RELATIONS_SUCCESS: {
      const relations = _.chain(action.relations)
        .map(r => [r.jobTitleId, r.neighborId].sort())
        .uniqBy(r => r.join(','))
        .value();

      return state
        .set('relations', List(relations));
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
    //   const titleObj = _.find(titlesFromState, { id: action.updatedTitle.id });
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

      return state.set('relations', relations); // TODO: Use immutable relations
    }

    case REMOVE_RELATION: {
      const [a, b] = action.titles; // ids
      let relations = state.get('relations');
      const relIndex = state.get('relations').findIndex(r => r.indexOf(a) !== -1 && r.indexOf(b) !== -1);
      if (relIndex !== -1) {
        relations = relations.remove(relIndex);
      }

      return state.set('relations', relations); // TODO: Use immutable relations
    }

    case UPDATE_SENIORITY: {
      const titleId = action.titleId;
      const seniority = action.seniority;
      const titles = state.get('titles');

      const titleObj = _.find(titles, { id: titleId });
      titleObj.seniority = seniority;

      return state.set('titles', titles); // TODO: Use immutable titles Map
    }

    case UPDATE_PROXIMITY: {
      const [a, b] = action.titles; // ids
      let relations = state.get('relations');
      const entry = relations.findEntry(r => r.indexOf(a) !== -1 && r.indexOf(b) !== -1); // returns [idx, relation]
      if (entry && Array.isArray(entry[1])) {
        return state;
      }
      entry[1].push('new data');
      relations = relations.update(entry[0], () => entry[1]);

      return state.set('relations', relations);
    }

    default:
      return state;
  }
}

export default filterParamsReducer;
