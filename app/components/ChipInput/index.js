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
    },
    filter: filters.caseInsensitiveStartsWithFilter,
    freetextDisabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.input.value,
    };

    this.handleRequestAdd = this.handleRequestAdd.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
  }

  componentWillReceiveProps({ value }) {
    if (value !== undefined) {
      this.setState({ value });
    }
  }

  isChipInSource(chip) {
    const dataSource = this.props.dataSource || [];
    return dataSource.indexOf(chip) !== -1;
  }

  handleRequestAdd(chip) {
    console.log('handleRequestAdd', chip);
    if (this.props.freetextDisabled && !this.isChipInSource(chip)) {
      return;
    }

    const value = [...this.state.value, chip];
    this.props.input.onChange(value);
    this.setState({ value });
  }

  handleRequestDelete(chip) {
    const value = without(this.state.value, chip);
    this.props.input.onChange(value);
    this.setState({ value });
  }

  render() {
    const {
      input: {
        value,
        ...inputProps,
      },
      ...otherProps,

    } = this.props;

    return (
      <MUIChipInput
        value={value}
        onRequestAdd={this.handleRequestAdd}
        onRequestDelete={this.handleRequestDelete}
        {...inputProps}
        {...otherProps}
      />
    );
  }
}
