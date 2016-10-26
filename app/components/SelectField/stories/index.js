import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SelectField from '../index';
import MenuItem from 'components/MenuItem';

const parentProps = () => ({
  input: { onChange: action('onChange') },
});

storiesOf('SelectField', module)
  .add('default', () => (
    <SelectField {...parentProps()} label="Label" value={2}>
      <MenuItem value={1} primaryText="Never" />
      <MenuItem value={2} primaryText="Every Night" />
      <MenuItem value={3} primaryText="Weeknights" />
      <MenuItem value={4} primaryText="Weekends" />
      <MenuItem value={5} primaryText="Weekly" />
    </SelectField>
  ));
