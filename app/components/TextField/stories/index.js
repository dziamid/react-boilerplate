import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TextField from '../index';
import ReduxFormField from 'stories/ReduxFormField';


storiesOf('TextField', module)
  .addDecorator(getStory => <ReduxFormField>{getStory()}</ReduxFormField>)

  .add('default', () => (
    <TextField label="Label on the top" />
  ))
  .add('with label on the left', () => (
    <TextField label="Label on the left" labelPosition="left" />
  ))
  .add('with clear icon', () => (
    <TextField label="Label on the left" withClear onClear={action('will clear input')} />
  ))
  .add('with custom onChange', () => (
    <TextField
      label="Label on the left"
      withClear
      onClear={action('will clear input')}
      onChange={action('custom onChange')}
    />
  ));
