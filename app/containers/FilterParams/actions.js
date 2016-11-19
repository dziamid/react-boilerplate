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
  FILTER_RESULTS,
  UPDATE_TITLE_SUCCESS,
  UPDATE_TITLE_ERROR,
  ADD_RELATION,
  REMOVE_RELATION,
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

export function updateTitle(titleId, newTitle) {
  return {
    type: UPDATE_TITLE_SUCCESS,
    titleId,
    updatedTitle: newTitle,
    // newTitle,
  };
}

export function updateTitleSuccess(titleId, updatedTitle) {
  return {
    type: UPDATE_TITLE_SUCCESS,
    titleId,
    updatedTitle,
  };
}

export function updateTitleErr(titleId, error) {
  return {
    type: UPDATE_TITLE_ERROR,
    titleId,
    error,
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
