import { call, take, put, select, race } from 'redux-saga/effects';
import { showToast, hideActiveToast } from './actions';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const TIMEOUT = 5000;

export function* watchToastrQueue() {
  while (true) {
    const state = yield select();
    const queue = state.getIn(['toastr', 'queue']);

    if (queue.size > 0) {
      const toast = queue.get(0);
      yield put(showToast(toast));

      yield race({
        timeout: call(delay, TIMEOUT), // timeout between toasts
        reset: take('TOASTR_RESET'),
      });
    } else {
      yield put(hideActiveToast()); // ensure that the last toast hides
      yield take(['TOASTR_QUEUE', 'TOASTR_RESET']); // wait before a new toast in the queue
    }
  }
}
