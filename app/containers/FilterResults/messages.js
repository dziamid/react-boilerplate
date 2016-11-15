/*
 * FilterResults Messages
 *
 * This contains all the text for the FilterResults component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  select: {
    id: 'app.containers.FilterResults.select',
    defaultMessage: 'Select',
  },
  jobTitle: {
    id: 'app.containers.FilterResults.jobTitle',
    defaultMessage: 'Job Title',
  },
  seniority: {
    id: 'app.containers.FilterResults.seniority',
    defaultMessage: 'Seniority',
  },
  addRelation: {
    id: 'app.containers.FilterResults.addRelation',
    defaultMessage: 'Add Relation',
  },
  total: {
    id: 'app.containers.FilterResults.totals',
    defaultMessage: 'Displaying [[filtered]] out of [[total]] Titles',
  },
});
