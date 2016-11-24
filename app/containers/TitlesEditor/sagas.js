/**
 * Gets the subcategories & categories
 */

import { takeEvery } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import request, { get, post, patch, destroy } from 'utils/request';
import * as selectors from './selectors';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  FETCH_SUBCATEGORIES,
  FETCH_TITLES,
  PATCH_SENIORITY,
  CREATE_RELATION,
  DESTROY_RELATION,
  PATCH_PROXIMITY,
} from './constants';

import {
  fetchSubCategoriesSuccess,
  fetchSubCategoriesError,
  fetchTitlesSuccess,
  fetchTitlesError,
  fetchTitleRelationsSuccess,
  addRelation,
  removeRelation,
  updateProximity,
  updateSeniority,
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

function* patchSeniority(action) {
  const { title, seniority } = action;
  const url = `/jobTitles/${title.id}`;
  const data = { seniority };

  yield call(patch, { url, data });
  yield put(updateSeniority(title, seniority));
}

function* createSingleRelation(data) {
  yield call(post, { url: '/jobTitleNeighbors', data }, addRelation);
}

function* createRelation({ relation }) {
  const { jobTitleId, neighborId, proximity } = relation;
  const neighbor = { jobTitleId: neighborId, neighborId: jobTitleId, proximity };
  yield [
    createSingleRelation(relation),
    createSingleRelation(neighbor),
  ];
}

function* destoySingleRelation(relation) {
  yield call(destroy, { url: `/jobTitleNeighbors/${relation.id}` });
  yield put(removeRelation(relation));
}

function* destroyRelation({ relation }) {
  const bucket = [relation];
  const relations = yield select(selectors.relations());
  const neighbor = getNeighborRelation(relations, relation);

  if (neighbor) {
    bucket.push(neighbor);
  }

  yield bucket.map(r => destoySingleRelation(r));
}

function* patchSingleProximity(relation, proximity) {
  yield call(patch, { url: `/jobTitleNeighbors/${relation.id}`, data: { proximity } });
  yield put(updateProximity(relation, proximity));
}

function* patchProximity({ relation, proximity }) {
  const bucket = [relation];

  const relations = yield select(selectors.relations());
  const neighbor = getNeighborRelation(relations, relation);

  if (neighbor) {
    bucket.push(neighbor);
  }

  yield bucket.map(r => patchSingleProximity(r, proximity));
}

function getNeighborRelation(relations, relation) {
  return relations.find(r => r.jobTitleId === relation.neighborId);
}


/**
 * Root saga manages watcher lifecycle
 */
export function* dataLoader() {
  const watcher = yield [
    fork(takeEvery, PATCH_SENIORITY, patchSeniority),
    fork(takeEvery, FETCH_SUBCATEGORIES, fetchSubCats),
    fork(takeEvery, FETCH_TITLES, fetchTitles),
    fork(takeEvery, CREATE_RELATION, createRelation),
    fork(takeEvery, DESTROY_RELATION, destroyRelation),
    fork(takeEvery, PATCH_PROXIMITY, patchProximity),
  ];

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  dataLoader,
];

