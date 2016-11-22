/**
 * Gets the subcategories & categories
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { FETCH_SUBCATEGORIES, FETCH_TITLES } from 'containers/FilterParams/constants';
import request from 'superagent';
import {
  fetchSubCategoriesSuccess,
  fetchSubCategoriesError,
  fetchTitlesSuccess,
  fetchTitlesError,
  fetchTitleRelationsSuccess,
} from 'containers/FilterParams/actions';

import { BASE_API, API_KEY } from 'containers/TitlesEditor/constants';
import selectFilterParams from 'containers/FilterParams/selectors';

export function* get(params, onSuccess, onError) {
  const opts = typeof (params) === 'string' ? { url: params } : params;

  try {
    const { body } = yield call(request.get, opts.url);
    yield put(onSuccess(body));
  } catch (err) {
    onError && (yield put(onError(err)));
  }
}


export function* fetchSubCats() {
  yield call(get, `${BASE_API}/jobSubCategories`, fetchSubCategoriesSuccess, fetchSubCategoriesError);
}

export function* fetchTitles() {
  const { selectedSubCategory } = yield select(selectFilterParams());
  const requestURL = `${BASE_API}/jobSubCategories/${selectedSubCategory}/jobTitles`;
  yield call(get, requestURL, fetchTitlesSuccess, fetchTitlesError);
}

export function* fetchTitleRelations() {
  // Select from store
  const { titles } = yield select(selectFilterParams());
  const ids = titles.map(t => t._id);
  const filter = { where: { jobTitleId: { inq: ids } } };
  const url = `${BASE_API}/jobTitleNeighbors`;
  const query = { filter: JSON.stringify(filter) };
  yield call(get, { url, query }, fetchTitleRelationsSuccess);
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
