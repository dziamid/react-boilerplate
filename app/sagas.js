// here we place all sync sagas

import { watchToastrQueue } from 'components/Toastr/sagas';

export default [
  watchToastrQueue,
];
