import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Autocomplete from '../index';
import countries from 'components/common/stories/countries';
import ReduxFormField from 'stories/ReduxFormField';

storiesOf('Autocomplete', module)
  .addDecorator(getStory => <ReduxFormField>{getStory()}</ReduxFormField>)
  .add('default', () => (
    <Autocomplete
      dataSource={countries.map(c => ({ text: c.name, value: c.code }))}
      label="Choose Country"
    />
  ))
  .add('with clear', () => (
    <Autocomplete
      dataSource={countries.map(c => ({ text: c.name, value: c.code }))}
      label="Choose Country"
      withClear
      onClear={action('onClear')}
    />
  ));
