// here we place all sync sagas

import { watchToastrQueue } from 'components/Toastr/sagas';
import { categoriesData } from 'containers/TitlesEditor/sagas';

export default [
  watchToastrQueue,
  categoriesData,
];
