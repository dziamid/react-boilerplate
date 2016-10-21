import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SampleForm from '../index';

storiesOf('SampleForm', module)
  .add('with server modal confirm and server validation error', () => (
    <SampleForm />
  ));
