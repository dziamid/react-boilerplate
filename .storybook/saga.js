import { watchToastrQueue } from 'components/Toastr/sagas';

export default function* rootSaga() {
  console.log('root saga');
  yield [
    watchToastrQueue(),
  ]
}