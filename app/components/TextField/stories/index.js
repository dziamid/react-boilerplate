import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TextField from '../index';

const parentProps = {
  input: { name: 'field1' },
  meta: {},
};

storiesOf('TextField', module)
  .add('default', () => (
    <TextField label="Label on the top" {...parentProps} />
  ))
  .add('with label on the left', () => (
    <TextField label="Label on the left" labelPosition="left" {...parentProps} />
  ))
  .add('with clear icon', () => (
    <TextField label="Label on the left" withClear onClear={action('will clear input')} {...parentProps} />
  ));
