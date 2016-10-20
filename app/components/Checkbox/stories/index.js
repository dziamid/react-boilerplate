import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Checkbox from '../index';

const parentProps = (checked) => ({
  input: { name: 'field1', value: checked },
  meta: {},
});

storiesOf('Checkbox', module)
  .add('default', () => (
    <div>
      <Checkbox {...parentProps(false)} />
      <Checkbox {...parentProps(true)} />
    </div>
  ))
  .add('with label on the left', () => (
    <div>
      <Checkbox label="Label on the left" {...parentProps(false)} />
      <Checkbox label="Label on the left" {...parentProps(true)} />
    </div>
  ));
