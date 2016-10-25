export function showSuccessToast(message) {
  return queueToast({ message, type: 'success' });
}

export function showErrorToast(message) {
  return queueToast({ message, type: 'error' });
}

export function showToast(toast) {
  return {
    type: 'SHOW_TOAST',
    payload: toast,
  };
}

export function queueToast(toast) {
  return {
    type: 'QUEUE_TOAST',
    payload: toast,
  };
}

export function hideActiveToast() {
  return {
    type: 'HIDE_ACTIVE_TOAST',
  };
}
