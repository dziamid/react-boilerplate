import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TextField from '../index';

const parentFieldProps = {
  input: { name: 'field1' },
  meta: {},
};

storiesOf('TextField', module)
  .add('default', () => (
    <TextField label="Label on the top" {...parentFieldProps} />
  ))
  .add('with label on the left', () => (
    <TextField label="Label on the left" labelPosition="left" {...parentFieldProps} />
  ));
