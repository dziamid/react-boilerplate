import { ADD_TOASTR, REMOVE_TOASTR, CLEAN_TOASTR } from './constants';
import { mapToToastrMessage } from './utils';

export function hideAllToasts() {
  return {
    type: CLEAN_TOASTR,
  };
}

export function hideToast(id) {
  return {
    type: REMOVE_TOASTR,
    payload: {
      id,
    },
  };
}

export function showSuccessToast(...toastr) {
  return {
    type: ADD_TOASTR,
    payload: mapToToastrMessage('success', toastr),
  };
}

export function showInfoToast(...toastr) {
  return {
    type: ADD_TOASTR,
    payload: mapToToastrMessage('info', toastr),
  };
}

export function showWarningToast(...toastr) {
  return {
    type: ADD_TOASTR,
    payload: mapToToastrMessage('warning', toastr),
  };
}

export function showErrorToast(...toastr) {
  return {
    type: ADD_TOASTR,
    payload: mapToToastrMessage('error', toastr),
  };
}

