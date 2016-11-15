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
  fetchTitlesError
} from 'containers/FilterParams/actions';

import { BASE_API } from 'containers/TitlesEditor/constants'

import request from 'utils/request';
// import selectFilterParams from 'containers/FilterParams/selectors';

/**
 * Generic request/response handler
 */
export function* fetchData(requestURL, successCb, errCb) {
  // Call our request helper (see 'utils/request')
  const response = yield call(request, requestURL);

  if (!response.err) {
    yield put(successCb(response.data));
  } else {
    yield put(errCb(response.err));
  }
}

export function* fetchSubCats() {
  /*
   // Select from store
   const filterParams = yield select(selectFilterParams());
   const selectedCat = filterParams.selectedCategory;
   */
  const requestURL = BASE_API.replace('[[query]]', 'jobSubCategories');

  yield call(fetchData, requestURL, fetchSubCategoriesSuccess, fetchSubCategoriesError);
}

export function* fetchTitles() {
  const requestURL = BASE_API.replace('[[query]]', 'jobTitles');

  yield call(fetchData, requestURL, fetchTitlesSuccess, fetchTitlesError);
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
