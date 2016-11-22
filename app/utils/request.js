import { call, put as putSaga } from 'redux-saga/effects';
import axios from 'axios';

export default function* request(params, onSuccess, onError) {
  try {
    const { data } = yield call(axios, params);
    yield putSaga(onSuccess(data));
  } catch (err) {
    onError && (yield putSaga(onError(err)));
  }
}

export function* get(params, ...other) {
  yield request({ method: 'GET', ...mapAxiosParams(params) }, ...other);
}

export function* post(params, ...other) {
  yield* request({ method: 'POST', ...mapAxiosParams(params) }, ...other);
}

export function* put(params, ...other) {
  yield* request({ method: 'PUT', ...mapAxiosParams(params) }, ...other);
}

export function* patch(params, ...other) {
  yield* request({ method: 'PATCH', ...mapAxiosParams(params) }, ...other);
}

export function* remove(params, ...other) {
  yield* request({ method: 'DELETE', ...mapAxiosParams(params) }, ...other);
}

function mapAxiosParams(params) {
  return typeof(params) === 'string' ? { url: params } : params;
}
