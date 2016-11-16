import { watchToastrQueue } from 'components/Toastr/sagas';
import { watchAddressRequest } from 'components/AddressAutocomplete/sagas';

export default function* rootSaga() {
  console.log('root saga');
  yield [
    watchToastrQueue(),
    watchAddressRequest(),
  ]
}