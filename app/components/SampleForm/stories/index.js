import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SampleForm from '../index';

const Layout = ({ children }) => (
  <div style={{ margin: '20px' }}>{children}</div>
);

storiesOf('SampleForm', module)
  .addDecorator(getStory => <Layout>{getStory()}</Layout>)
  .add('with server validation error', () => (
    <SampleForm triggerValidationError />
  ))
  .add('with a success toast after submission', () => (
    <SampleForm />
  ));
