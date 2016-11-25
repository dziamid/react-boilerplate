/*
 * TitlesEditor Messages
 *
 * This contains all the text for the TitlesEditor component.
 */
import { defineMessages } from 'react-intl';
import startCase from 'lodash/startCase';

const messages = {};

['searchTitles', 'editSeniorityAndRelations'].forEach(t => {
  messages[t] = {
    id: `app.containers.TitlesEditor.${t}`,
    defaultMessage: startCase(t),
  };
});

export default defineMessages(messages);
