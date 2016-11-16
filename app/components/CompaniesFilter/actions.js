
export function changeValue(value) {
  return {
    type: 'COMPANIES_FILTER_VALUE_CHANGED',
    payload: value,
  };
}

export function selectCompany(company) {
  return {
    type: 'COMPANIES_FILTER_SELECT_COMPANY',
    payload: company,
  };
}

export function unselectCompany(company) {
  return {
    type: 'COMPANIES_FILTER_UNSELECT_COMPANY',
    payload: company,
  };
}
