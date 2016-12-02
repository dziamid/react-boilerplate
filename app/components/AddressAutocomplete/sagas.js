import { put } from 'redux-saga/effects';
import { throttle } from 'redux-saga';
import { show } from './actions';
import loadGoogleMapsAPI from 'load-google-maps-api';
import { hasIn } from 'lodash';

function loadSuggestions(input) {
  return new Promise((resolve, reject) => {
    if (!isAPILoaded()) {
      reject('Google maps API is not loaded');
      return;
    }

    const autocompleteService = new window.google.maps.places.AutocompleteService();
    const OK = window.google.maps.places.PlacesServiceStatus.OK;

    autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
      if (status !== OK) {
        reject(status);
      } else {
        resolve(predictionsToSuggesions(predictions));
      }
    });
  });
}

function predictionsToSuggesions(predictions) {
  return predictions.map(p => ({ text: p.description, value: p.place_id }));
}

function isAPILoaded() {
  return hasIn(window, 'google.maps.places.AutocompleteService');
}

function loadAPI() {
  return loadGoogleMapsAPI({
    key: 'AIzaSyCTX-Xjg4EEXadLNTm28yWMhtLupEy5r1w',
    libraries: ['places'],
  });
}

function* handleAutocompleteLoad({ payload: query }) {
  const suggestions = yield loadSuggestions(query);
  yield put(show(suggestions));
}

export function* watchAddressRequest() {
  if (!isAPILoaded()) {
    yield loadAPI();
  }

  yield throttle(1000, 'ADDRESS_AUTOCOMPLETE_LOAD', handleAutocompleteLoad);
}

