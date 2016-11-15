// here we place all sync sagas

import { watchToastrQueue } from 'components/Toastr/sagas';
import { dataLoader } from 'containers/TitlesEditor/sagas';

export default [
  watchToastrQueue,
  dataLoader,
];
