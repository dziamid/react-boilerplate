import React, { Component } from 'react';
import { default as MUIAutocomplete } from 'material-ui/AutoComplete';

const {
  noFilter,
  caseSensitiveFilter,
  caseInsensitiveFilter,
  fuzzyFilter,
} = MUIAutocomplete;

const caseInsensitiveStartsWithFilter = (searchText, value) => value.toLowerCase().indexOf(searchText.toLowerCase()) === 0;

export const filters = {
  caseSensitiveFilter,
  caseInsensitiveFilter,
  caseInsensitiveStartsWithFilter,
  fuzzyFilter,
  noFilter,
};

export default class Autocomplete extends Component {

  static defaultProps = {
    input: {
      onChange: () => {
      },
    },
    filter: caseInsensitiveStartsWithFilter,
  };

  constructor() {
    super();
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
  }
  
  handleNewRequest(searchText, key) {
    if (key !== -1) {
      const { text } = searchText;
      this.props.input.onChange(text);
    }
  }

  handleInputUpdate(searchText) {
    this.props.input.onChange(searchText);
  }

  render() {
    const {
      input: { value, ...inputProps },
      meta: { touched, error },
      label,
      filter,
      dataSource,
      ...other,
    } = this.props;

    return (
      <MUIAutocomplete
        floatingLabelText={label}
        floatingLabelFixed={label !== undefined}
        errorText={touched && error}
        {...inputProps}
        searchText={value}
        onNewRequest={this.handleNewRequest}
        onUpdateInput={this.handleInputUpdate}
        filter={filter}
        dataSource={dataSource}
        {...other}
      />
    );
  }
}
