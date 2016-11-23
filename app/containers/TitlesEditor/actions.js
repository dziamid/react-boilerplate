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
  CREATE_RELATION,
  DESTROY_RELATION,
  UPDATE_PROXIMITY,
  UPDATE_PROXIMITY_LOCAL,
  PATCH_SENIORITY,
  UPDATE_SENIORITY,
  UPDATE_TITLE,
  SET_SELECTED_TITLE,
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

export function createRelation(jobTitleId, neighborId) {
  return {
    type: CREATE_RELATION,
    jobTitleId,
    neighborId,
  };
}

export function addRelation(relation) {
  return {
    type: ADD_RELATION,
    relation,
  };
}

export function destroyRelation(relation) {
  return {
    type: DESTROY_RELATION,
    relation,
  };
}

export function removeRelation(relation) {
  return {
    type: REMOVE_RELATION,
    relation,
  };
}

export function updateSeniority(title, seniority) {
  return {
    type: UPDATE_SENIORITY,
    title,
    seniority,
  };
}

export function patchSeniority(title, seniority) {
  return {
    type: PATCH_SENIORITY,
    title,
    seniority,
  };
}

export function updateProximity(relation, proximity) {
  return {
    type: UPDATE_PROXIMITY,
    relation,
    proximity,
  };
}

export function updateProximityLocal(relation, proximity) {
  return {
    type: UPDATE_PROXIMITY_LOCAL,
    relation,
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

export function setSelectedTitle(titleId) {
  return {
    type: SET_SELECTED_TITLE,
    titleId,
  };
}
