import { List } from 'immutable';
import companies from 'components/common/stories/companies'; // todo: rename stories to mocks

const initialState = List(companies);

function companiesReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default companiesReducer;
