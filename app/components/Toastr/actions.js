export function showSuccessToast(message) {
  return queueToast({ message, type: 'success' });
}

export function showErrorToast(message) {
  return queueToast({ message, type: 'error' });
}

export function showToast(toast) {
  return {
    type: 'TOASTR_SHOW',
    payload: toast,
  };
}

export function queueToast(toast) {
  return {
    type: 'TOASTR_QUEUE',
    payload: toast,
  };
}

export function hideActiveToast() {
  return {
    type: 'TOASTR_HIDE_ACTIVE',
  };
}

export function reset() {
  return {
    type: 'TOASTR_RESET',
  };
}
