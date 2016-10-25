const without = require('lodash/without');

const initialState = {
  queue: [],
  activeToast: null,
};

function toastrReducer(state = initialState, action) {
  const toast = action.payload;
  switch (action.type) {
    case 'TOASTR_QUEUE':
      return {
        ...state,
        queue: [
          ...state.queue,
          toast,
        ],
      };

    case 'TOASTR_SHOW':
      return {
        queue: without(state.queue, toast),
        activeToast: toast,
      };

    case 'TOASTR_HIDE_ACTIVE':
      return {
        ...state,
        activeToast: null,
      };

    case 'TOASTR_RESET':
      return initialState;

    default:
      return state;
  }
}

export default toastrReducer;
