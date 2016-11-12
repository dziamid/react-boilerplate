/*
 * SingleTitle Messages
 *
 * This contains all the text for the TitlesEditor component.
 */
import { defineMessages } from 'react-intl';
import startCase from 'lodash/startCase';

const messages = {};

['seniority', 'editRelations', 'jobTitle', 'proximity', 'delete'].map(t => messages[t] =
{
  id: `app.containers.SingleTitle.${t}`,
  defaultMessage: startCase(t),
}
);

console.log(messages);

export default defineMessages(messages);
