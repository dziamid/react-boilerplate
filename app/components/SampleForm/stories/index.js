import React from 'react';
import { SubmissionError } from 'redux-form';
import { storiesOf, action } from '@kadira/storybook';
import SampleForm from '../index';

const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

const submit = (values) => {
  action('form-submitted')(values);

  return sleep(300)
    .then(() => {
      action('response-arrived')();
      throw new SubmissionError({ email: 'User not found' });
    });
};

storiesOf('SampleForm', module)
  .add('default', () => (
    <SampleForm onSubmit={action('form-submitted')} />
  ))
  .add('with submit validation', () => (
    <SampleForm onSubmit={submit} />
  ));
