import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SampleForm from '../index';

storiesOf('SampleForm', module)
  .add('with server validation error', () => (
    <SampleForm triggerValidationError />
  ))
  .add('with a success toast after submission', () => (
    <SampleForm />
  ));
