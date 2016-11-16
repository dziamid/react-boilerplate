import { fromJS } from 'immutable';

const initialState = fromJS({
  value: 'favorite',
  companies: [],
});

function companiesFilterReducer(state = initialState, action) {
  const companies = state.get('companies');

  switch (action.type) {
    case 'COMPANIES_FILTER_VALUE_CHANGED':
      return state.set('value', action.payload);

    case 'COMPANIES_FILTER_SELECT_COMPANY':
      return state.set('companies', companies.push(action.payload));

    case 'COMPANIES_FILTER_UNSELECT_COMPANY':
      return state.set('companies', companies.delete(companies.indexOf(action.payload)));
    default:
      return state;
  }
}

export default companiesFilterReducer;
