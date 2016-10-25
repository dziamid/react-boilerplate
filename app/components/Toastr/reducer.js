const without = require('lodash/without');

const initialState = {
  queue: [],
  activeToast: null,
};

function toastrReducer(state = initialState, action) {
  const toast = action.payload;
  switch (action.type) {
    case 'QUEUE_TOAST':
      return {
        ...state,
        queue: [
          ...state.queue,
          toast,
        ],
      };

    case 'SHOW_TOAST':
      return {
        queue: without(state.queue, toast),
        activeToast: toast,
      };


    case 'HIDE_ACTIVE_TOAST':
      return {
        ...state,
        activeToast: null,
      };

    default:
      return state;
  }
}

export default toastrReducer;
