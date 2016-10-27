import React, { Component } from 'react';
import { default as MUIAutocomplete } from 'material-ui/AutoComplete';

const {
  noFilter,
  caseSensitiveFilter,
  caseInsensitiveFilter,
  fuzzyFilter,
} = MUIAutocomplete;

const caseInsensitiveStartsWithFilter = (query, key) => key.toLowerCase().indexOf(query.toLowerCase()) === 0;

export const filters = {
  caseSensitiveFilter,
  caseInsensitiveFilter,
  caseInsensitiveStartsWithFilter,
  fuzzyFilter,
  noFilter,
};

export default class Autocomplete extends Component {
  render() {
    const {
      input: { onChange, value, ...inputProps },
      meta: { touched, error },
      label,
      filter,
      ...other,
    } = this.props;

    return (
      <MUIAutocomplete
        floatingLabelText={label}
        floatingLabelFixed={label !== undefined}
        errorText={touched && error}
        {...inputProps}
        searchText={value}
        onNewRequest={v => onChange(v)}
        onUpdateInput={v => onChange(v)}
        filter={filter || caseInsensitiveStartsWithFilter}
        {...other}
      />
    );
  }
}
