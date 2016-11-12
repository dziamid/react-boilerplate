/*
 * TitlesEditor Messages
 *
 * This contains all the text for the TitlesEditor component.
 */
import { defineMessages } from 'react-intl';
import startCase from 'lodash/startCase';

const messages = {};

['searchTitles', 'editSeniorityAndRelations'].map(t => messages[t] =
{
  id: `app.containers.TitlesEditor.${t}`,
  defaultMessage: startCase(t),
}
);

console.log(messages);

export default defineMessages(messages);
