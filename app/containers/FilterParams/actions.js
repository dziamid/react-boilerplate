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
  FILTER_RESULTS,
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
    error
  };
}

export function fetchTitles(subCategoryId) {
  console.debug('fetch titles')
  return {
    type: FETCH_TITLES,
    subCategoryId,
  };
}

export function fetchTitlesSuccess(titles) {
  return {
    type: FETCH_TITLES_SUCCESS,
    titles
  };
}

export function filterResults(filterText) {
  return {
    type: FILTER_RESULTS,
    filterText,
  };
}
