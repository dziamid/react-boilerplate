import React, { Component } from 'react';
import { default as MUIChipInput } from 'material-ui-chip-input';
import without from 'lodash/without';

export default class ChipInput extends Component {

  static defaultProps = {
    input: {
      value: [],
      onChange: () => {
      },
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.input.value,
    };
  }

  componentWillReceiveProps({ value }) {
    if (value !== undefined) {
      this.setState({ value });
    }
  }

  handleRequestAdd(chip) {
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
        onRequestAdd={(chip) => this.handleRequestAdd(chip)}
        onRequestDelete={(chip) => this.handleRequestDelete(chip)}
        {...inputProps}
        {...otherProps}
      />
    );
  }
}
