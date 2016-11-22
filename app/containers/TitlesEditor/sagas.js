/**
 * Gets the subcategories & categories
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import request, { get } from 'utils/request';

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


export function* fetchSubCats() {
  yield call(get, `${BASE_API}/jobSubCategories`, fetchSubCategoriesSuccess, fetchSubCategoriesError);
}

export function* fetchTitles() {
  const { selectedSubCategory } = yield select(selectFilterParams());
  const url = `${BASE_API}/jobSubCategories/${selectedSubCategory}/jobTitles`;
  yield call(request, url, fetchTitlesSuccess, fetchTitlesError);
}

export function* fetchTitleRelations() {
  const { titles } = yield select(selectFilterParams());
  const ids = titles.map(t => t.id);
  const filter = { where: { jobTitleId: { inq: ids } } };
  const url = `${BASE_API}/jobTitleNeighbors`;
  const params = { filter };

  yield call(request, { url, params }, fetchTitleRelationsSuccess);
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

