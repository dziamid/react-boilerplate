import { Map } from 'immutable';

const initialState = Map({
  suggestions: [],
});

function addressAutocompleteReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADDRESS_AUTOCOMPLETE_SHOW':
      return state.set('suggestions', action.payload);

    default:
      return state;
  }
}

export default addressAutocompleteReducer;
