import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Autocomplete from '../index';
import countries from 'components/common/stories/countries';

const props = {
  input: { name: 'field1' },
  meta: {},
  dataSource: countries.map(c => ({ text: c.name, value: c.code })),
};

storiesOf('Autocomplete', module)
  .add('with freetext', () => (
    <Autocomplete
      {...props}
      label="Autocomplete"
    />
  ))
  .add('without freetext', () => (
    <Autocomplete
      {...props}
      label="Autocomplete"
    />
  ));
