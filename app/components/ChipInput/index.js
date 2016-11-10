import React, { Component } from 'react';
import { default as MUIChipInput } from 'material-ui-chip-input';
import without from 'lodash/without';
import { filters } from 'components/Autocomplete';

export default class ChipInput extends Component {

  static defaultProps = {
    input: {
      value: [],
      onChange: () => {
      },
      onBlur: () => {
      },
    },
    filter: filters.caseInsensitiveFilter,
    freetextDisabled: false,
  };

  constructor(props) {
    super(props);

    this.handleRequestAdd = this.handleRequestAdd.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  isChipInSource(chip) {
    const dataSource = this.props.dataSource || [];
    return dataSource.indexOf(chip) !== -1;
  }

  handleRequestAdd(chip) {
    if (this.props.freetextDisabled && !this.isChipInSource(chip)) {
      return;
    }

    const value = [...this.props.input.value, chip];
    this.props.input.onChange(value);
  }

  handleRequestDelete(chip) {
    const value = without(this.props.input.value, chip);
    this.props.input.onChange(value);
  }

  handleBlur() {
    console.log(this.props.input.onBlur);
    this.props.input.onBlur();
  }

  render() {
    const {
      input: {
        value,
        onBlur, // eslint-disable-line no-unused-vars
        ...inputProps,
      },
      label,
      freetextDisabled, // eslint-disable-line no-unused-vars
      ...otherProps,

    } = this.props;

    return (
      <MUIChipInput
        floatingLabelText={label}
        floatingLabelFixed={label !== undefined}
        value={value}
        onRequestAdd={this.handleRequestAdd}
        onRequestDelete={this.handleRequestDelete}
        onBlur={this.handleBlur}
        {...inputProps}
        {...otherProps}
      />
    );
  }
}
