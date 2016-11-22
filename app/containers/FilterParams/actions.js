/*
 *
 * FilterParams actions
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
  FILTER_RESULTS,
  ADD_RELATION,
  REMOVE_RELATION,
  UPDATE_PROXIMITY,
  UPDATE_SENIORITY,
  UPDATE_TITLE,
} from './constants';

export function fetchSubCategories(categoryId) {
  return {
    type: FETCH_SUBCATEGORIES,
    categoryId,
  };
}

export function fetchSubCategoriesSuccess(subCategories) {
  return {
    type: FETCH_SUBCATEGORIES_SUCCESS,
    subCategories,
  };
}

export function fetchSubCategoriesError(error) {
  return {
    type: FETCH_SUBCATEGORIES_ERROR,
    error,
  };
}

export function fetchTitles(subCategoryId) {
  return {
    type: FETCH_TITLES,
    subCategoryId,
  };
}

export function fetchTitlesSuccess(titles) {
  return {
    type: FETCH_TITLES_SUCCESS,
    titles,
  };
}

export function fetchTitlesError(error) {
  return {
    type: FETCH_TITLES_ERROR,
    error,
  };
}


export function fetchTitleRelationsSuccess(relations) {
  return {
    type: FETCH_TITLE_RELATIONS_SUCCESS,
    relations,
  };
}


export function filterResults(filterText) {
  return {
    type: FILTER_RESULTS,
    filterText,
  };
}

export function addRelation(...titles) {
  return {
    type: ADD_RELATION,
    titles: [...titles],
  };
}

export function removeRelation(...titles) {
  return {
    type: REMOVE_RELATION,
    titles: [...titles],
  };
}

export function updateSeniority(titleId, seniority) {
  return {
    type: UPDATE_SENIORITY,
    titleId,
    seniority,
  };
}

export function updateProximity(proximity, ...titles) {
  return {
    type: UPDATE_PROXIMITY,
    titles: [...titles],
    proximity,
  };
}

export function updateTitle(titleId, field, value) {
  return {
    type: UPDATE_TITLE,
    titleId,
    field,
    value,
  };
}
