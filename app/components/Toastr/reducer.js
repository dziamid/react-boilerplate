import { Map } from 'immutable';

const initialState = Map({
  queue: [],
  activeToast: null,
});

function toastrReducer(state = initialState, action) {
  const toast = action.payload;
  const queue = state.get('queue');

  switch (action.type) {
    case 'TOASTR_QUEUE':
      return state.set('queue', queue.push(toast));

    case 'TOASTR_SHOW':
      return state
        .set('activeToast', toast)
        .set('queue', queue.delete(queue.indexOf(toast)));

    case 'TOASTR_HIDE_ACTIVE':
      return state.set('activeToast', null);

    case 'TOASTR_RESET':
      return initialState;

    default:
      return state;
  }
}

export default toastrReducer;
