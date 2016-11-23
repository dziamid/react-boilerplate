/**
 * Gets the subcategories & categories
 */

import { takeEvery } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import request, { get, patch } from 'utils/request';

import { LOCATION_CHANGE } from 'react-router-redux';
import {
  FETCH_SUBCATEGORIES,
  FETCH_TITLES,
  UPDATE_SENIORITY,
} from 'containers/FilterParams/constants';

import {
  fetchSubCategoriesSuccess,
  fetchSubCategoriesError,
  fetchTitlesSuccess,
  fetchTitlesError,
  fetchTitleRelationsSuccess,
} from 'containers/FilterParams/actions';

import { BASE_API, API_KEY } from 'containers/TitlesEditor/constants';
import selectFilterParams from 'containers/FilterParams/selectors';

// todo: move BASE_API to utils/request
function* fetchSubCats() {
  yield call(get, `${BASE_API}/jobSubCategories`, fetchSubCategoriesSuccess, fetchSubCategoriesError);
}

function* fetchTitles() {
  const { selectedSubCategory } = yield select(selectFilterParams());
  const url = `${BASE_API}/jobSubCategories/${selectedSubCategory}/jobTitles`;
  yield call(request, url, fetchTitlesSuccess, fetchTitlesError);

  yield fetchTitleRelations();
}

function* fetchTitleRelations() {
  const { titles } = yield select(selectFilterParams());
  const ids = titles.map(t => t.id);
  const filter = { where: { jobTitleId: { inq: ids } } };
  const url = `${BASE_API}/jobTitleNeighbors`;
  const params = { filter };

  yield call(request, { url, params }, fetchTitleRelationsSuccess);
}

function* updateSeniority(action) {
  const { titleId, seniority } = action;
  const url = `${BASE_API}/jobTitles/${titleId}`;
  const data = { seniority };

  yield call(patch, { url, data });
}


/**
 * Root saga manages watcher lifecycle
 */
export function* dataLoader() {
  const watcher = yield [
    fork(takeEvery, UPDATE_SENIORITY, updateSeniority),
    fork(takeEvery, FETCH_SUBCATEGORIES, fetchSubCats),
    fork(takeEvery, FETCH_TITLES, fetchTitles),
  ];

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  dataLoader,
];

