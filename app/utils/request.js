import { call, put as putSaga } from 'redux-saga/effects';
import axios from 'axios';

export const BASE_API = process.env.BASE_API || 'http://138.68.100.219:4000/api';
// export const API_KEY = process.env.API_KEY || 'apiKey=WNDdxGon5y3SRaWjlqSM18l4gPvVhVgN&l=99999';

export default function* request(params, onSuccess, onError) { // todo: do not use callbacks!
  const _params = mapAxiosParams(params);
  if (_params.url.indexOf('/') === 0) {
    // relative url detected
    _params.url = BASE_API + _params.url;
  }

  try {
    const { data } = yield call(axios, _params);
    onSuccess && (yield putSaga(onSuccess(data)));
  } catch (err) {
    onError && (yield putSaga(onError(err)));
  }
}

export function* get(params, ...other) {
  yield request({ method: 'GET', ...mapAxiosParams(params) }, ...other);
}

export function* post(params, ...other) {
  yield request({ method: 'POST', ...mapAxiosParams(params) }, ...other);
}

export function* patch(params, ...other) {
  yield request({ method: 'PATCH', ...mapAxiosParams(params) }, ...other);
}

export function* destroy(params, ...other) {
  yield request({ method: 'DELETE', ...mapAxiosParams(params) }, ...other);
}

function mapAxiosParams(params) {
  return typeof (params) === 'string' ? { url: params } : params;
}
