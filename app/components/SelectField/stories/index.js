import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SelectField from '../index';
import MenuItem from 'components/MenuItem';
import countries from 'components/common/stories/countries';

const parentProps = () => ({
  input: { onChange: action('onChange') },
});

const options = countries.map(c => <MenuItem key={c.code} value={c.code} primaryText={c.name} />);

storiesOf('SelectField', module)
  .add('default', () => (
    <SelectField {...parentProps()} label="Select country" value="AU">
      {options}
    </SelectField>
  ));
