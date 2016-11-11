import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AddressAutocomplete from '../index';
import ReduxFormField from 'stories/ReduxFormField';

storiesOf('AddressAutocomplete', module)
  .addDecorator(getStory => <ReduxFormField>{getStory()}</ReduxFormField>)
  .add('default', () => (
    <AddressAutocomplete label="Enter address" />
  ))
  .add('with clear', () => (
    <AddressAutocomplete label="Enter address" withClear />
  ));
