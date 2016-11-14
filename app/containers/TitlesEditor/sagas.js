/**
 * Gets the subcategories & categories
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { FETCH_SUBCATEGORIES } from 'containers/FilterParams/constants';
import { fetchSubCategoriesSuccess } from 'containers/FilterParams/actions';

import request from 'utils/request';
import selectFilterParams from 'containers/FilterParams/selectors';

/**
 * Github repos request/response handler
 */
export function* fetchSubCats() {
  // Select from store
  const filterParams = yield select(selectFilterParams());
  const selectedCat = filterParams.selectedCategory;
  const requestURL =
    'https://api.mlab.com/api/1/databases/noviopus/collections/jobSubCategories?apiKey=WNDdxGon5y3SRaWjlqSM18l4gPvVhVgN';

  // Call our request helper (see 'utils/request')
  const subCats = yield call(request, requestURL);

  if (!subCats.err) {
    yield put(fetchSubCategoriesSuccess(subCats.data));
  } else {
    // yield put(repoLoadingError(repos.err));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* getSubCatsWatcher() {
  while (yield take(FETCH_SUBCATEGORIES)) {
    yield call(fetchSubCats);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* categoriesData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getSubCatsWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  categoriesData,
];
