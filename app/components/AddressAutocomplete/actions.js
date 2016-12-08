
function load(query) {
  return {
    type: 'ADDRESS_AUTOCOMPLETE_LOAD',
    payload: query,
  };
}
exports.load = load;
function show(suggestions) {
  return {
    type: 'ADDRESS_AUTOCOMPLETE_SHOW',
    payload: suggestions,
  };
}
exports.show = show;
// # sourceMappingURL=actions.js.map
