import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Autocomplete from '../index';
import countries from 'components/common/stories/countries';

storiesOf('Autocomplete', module)
  .add('react-select', () => (
    <Select
      name="form-field-name"
      value="AU"
      label="Choose country"
      options={countries.map(c => ({ label: c.name, value: c.code }))}
      onChange={action('onChange')}
    />
  ))
  .add('react-select-styled', () => (
    <Autocomplete
      name="form-field-name"
      value="AU"
      label="Choose country"
      options={countries.map(c => ({ label: c.name, value: c.code }))}
      onChange={action('onChange')}
    />
  ));
