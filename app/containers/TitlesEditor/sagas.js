/**
 * Gets the subcategories & categories
 */

import { takeEvery } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import request, { get, post, patch } from 'utils/request';
import * as selectors from './selectors';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  FETCH_SUBCATEGORIES,
  FETCH_TITLES,
  UPDATE_SENIORITY,
  CREATE_RELATION,
} from './constants';

import {
  fetchSubCategoriesSuccess,
  fetchSubCategoriesError,
  fetchTitlesSuccess,
  fetchTitlesError,
  fetchTitleRelationsSuccess,
  addRelation,
} from './actions';

function* fetchSubCats() {
  yield call(get, '/jobSubCategories', fetchSubCategoriesSuccess, fetchSubCategoriesError);
}

function* fetchTitles() {
  const selectedSubCategory = yield select(selectors.selectedSubCategory());
  const url = `/jobSubCategories/${selectedSubCategory}/jobTitles`;
  yield call(request, url, fetchTitlesSuccess, fetchTitlesError);

  yield fetchTitleRelations();
}

function* fetchTitleRelations() {
  const titles = yield select(selectors.titles());
  const ids = titles.map(t => t.id);
  const filter = { where: { jobTitleId: { inq: ids } } };
  const url = '/jobTitleNeighbors';
  const params = { filter };

  yield call(request, { url, params }, fetchTitleRelationsSuccess);
}

function* updateSeniority(action) {
  const { titleId, seniority } = action;
  const url = `/jobTitles/${titleId}`;
  const data = { seniority };

  yield call(patch, { url, data });
}

function* createSingleRelation(action) {
  yield call(post, { url: '/jobTitleNeighbors', data: action }, addRelation);
}

function* createRelation({ jobTitleId, neighborId, proximity }) {
  const rel = { jobTitleId, neighborId, proximity };
  const oppositeRel = { jobTitleId: neighborId, neighborId: jobTitleId, proximity };
  yield [
    createSingleRelation(rel),
    createSingleRelation(oppositeRel),
  ];
}


/**
 * Root saga manages watcher lifecycle
 */
export function* dataLoader() {
  const watcher = yield [
    fork(takeEvery, UPDATE_SENIORITY, updateSeniority),
    fork(takeEvery, FETCH_SUBCATEGORIES, fetchSubCats),
    fork(takeEvery, FETCH_TITLES, fetchTitles),
    fork(takeEvery, CREATE_RELATION, createRelation),
  ];

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  dataLoader,
];

