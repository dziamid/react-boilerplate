// here we place all sync sagas

import { watchToastrQueue } from 'components/Toastr/sagas';
import { dataLoader } from 'containers/TitlesEditor/sagas';
import { watchAddressRequest } from 'components/AddressAutocomplete/sagas';

export default [
  watchToastrQueue,
  dataLoader,
  watchAddressRequest,
];
