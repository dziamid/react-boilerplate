import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SelectField from '../index';
import MenuItem from 'components/MenuItem';
import countries from 'components/common/stories/countries';

const props = () => ({
  input: { onChange: action('onChange'), value: 'BY' },
});

const children = () => countries.map(c => <MenuItem key={c.code} value={c.code} primaryText={c.name} />);

storiesOf('SelectField', module)
  .add('default', () => (
    <SelectField
      {...props()}
      label="Select country"
    >
      {children()}
    </SelectField>
  ));
