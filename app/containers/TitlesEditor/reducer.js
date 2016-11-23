
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
  SET_SELECTED_TITLE,
} from 'containers/TitlesEditor/constants';

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
  results: [],

});

function filterParamsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TITLE:
      return state.set('selectedTitle', action.titleId);

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
      return state
        .set('relations', List(action.relations));
    }

    case ADD_RELATION: {
      const { relation } = action;

      return state.set('relations', state.get('relations').push(relation));
    }

    case REMOVE_RELATION: {
      const { relation } = action;

      let relations = state.get('relations');
      const relIndex = state.get('relations').findIndex(r => r.id === relation.id);

      if (relIndex !== -1) {
        relations = relations.remove(relIndex);
      }

      return state.set('relations', relations);
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
      throw 'not implemented';
    }

    default:
      return state;
  }
}

export default filterParamsReducer;
