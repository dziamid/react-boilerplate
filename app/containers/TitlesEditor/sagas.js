/**
 * Gets the subcategories & categories
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { FETCH_SUBCATEGORIES, FETCH_TITLES } from 'containers/FilterParams/constants';

import {
  fetchSubCategoriesSuccess,
  fetchSubCategoriesError,
  fetchTitlesSuccess,
  fetchTitlesError,
  fetchTitleRelationsSuccess,
} from 'containers/FilterParams/actions';

import { BASE_API, API_KEY } from 'containers/TitlesEditor/constants';
import selectFilterParams from 'containers/FilterParams/selectors';

import request, { buildURL } from 'utils/request';

/**
 * Generic request/response handler
 */
export function* fetchData(requestURL, successCb, errCb) {
  // Call our request helper (see 'utils/request')
  const response = yield call(request, requestURL);

  if (!response.err) {
    yield put(successCb(response.data));
  } else if (errCb) {
    yield put(errCb(response.err));
  }
}


export function* fetchSubCats() {
  // category: Computer, Software, Hardware, IT and Web
  const requestURL = `${BASE_API}/jobSubCategories`;

  yield call(fetchData, requestURL, fetchSubCategoriesSuccess, fetchSubCategoriesError);
}

export function* fetchTitles() {
  // Select from store
  const filterParams = yield select(selectFilterParams());
  const subCategoryId = filterParams.selectedSubCategory;
  const requestURL = `${BASE_API}/jobSubCategories/${subCategoryId}/jobTitles`;

  yield call(fetchData, requestURL, fetchTitlesSuccess, fetchTitlesError);
}

export function* fetchTitleRelations() {
  // Select from store
  const filterParams = yield select(selectFilterParams());
  const ids = filterParams.titles.map(t => t._id);
  const filter = { where: { jobTitleId: { inq: ids } } };
  const requestURL = buildURL(`${BASE_API}/jobTitleNeighbors`, { filter: JSON.stringify(filter) });

  yield call(fetchData, requestURL, fetchTitleRelationsSuccess);
}

/**
 * Watches for an action called on the store and calls handler
 */
export function* getSubCatsWatcher() {
  while (yield take(FETCH_SUBCATEGORIES)) {
    yield call(fetchSubCats);
  }
}

export function* getTitlesWatcher() {
  while (yield take(FETCH_TITLES)) {
    yield call(fetchTitles);
    yield call(fetchTitleRelations);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* dataLoader() {
  // Fork watcher so we can continue execution
  const watchers = [];
  watchers.push(yield fork(getSubCatsWatcher));
  watchers.push(yield fork(getTitlesWatcher));

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);

  // watchers.map(w => yield cancel(w));
  yield cancel(watchers);
}

// Bootstrap sagas
export default [
  dataLoader,
];
