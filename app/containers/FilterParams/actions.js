/*
 *
 * FilterParams actions
 *
 */

import {
  FETCH_SUBCATEGORIES,
  FETCH_TITLES,
  FILTER_RESULTS,
} from './constants';

export function fetchSubCategories(categoryId) {
  return {
    type: FETCH_SUBCATEGORIES,
    categoryId,
  };
}
export function fetchTitles(subCategoryId) {
  return {
    type: FETCH_TITLES,
    subCategoryId,
  };
}
export function filterResults(filterText) {
  return {
    type: FILTER_RESULTS,
    filterText,
  };
}
