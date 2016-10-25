import { call, take, put, select, race } from 'redux-saga/effects';
import { showToast, hideActiveToast } from './actions';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function* watchToastrQueue() {
  while (true) {
    const state = yield select();
    const queue = state.toastr.queue;

    if (queue.length > 0) {
      const toast = state.toastr.queue[0];
      yield put(showToast(toast));
      yield call(delay, 5000);
      yield put(hideActiveToast());
    } else {
      yield race({
        timeout: call(delay, 5000),
        toast: take('QUEUE_TOAST'),
      });
    }
  }
}
