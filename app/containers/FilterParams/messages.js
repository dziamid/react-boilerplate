/*
 * FilterParams Messages
 *
 * This contains all the text for the FilterParams component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  category: {
    id: 'app.containers.FilterParams.selectCategory',
    defaultMessage: 'Job Category',
  },
  subCategory: {
    id: 'app.containers.FilterParams.selectSubCategory',
    defaultMessage: 'Job Sub Category',
  },
  filter: {
    id: 'app.containers.FilterParams.filter',
    defaultMessage: 'Filter Results',
  },
  total: {
    id: 'app.containers.FilterParams.totals',
    defaultMessage: 'Displaying X out of YYY Titles',
    // defaultMessage: `Displaying ${props.numFiltered} out of ${props.numTotal} Titles`,
  },
});
