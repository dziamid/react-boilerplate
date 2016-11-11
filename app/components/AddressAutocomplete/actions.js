export function load(query) {
  return {
    type: 'ADDRESS_AUTOCOMPLETE_LOAD',
    payload: query,
  };
}

export function show(suggestions) {
  return {
    type: 'ADDRESS_AUTOCOMPLETE_SHOW',
    payload: suggestions,
  };
}
