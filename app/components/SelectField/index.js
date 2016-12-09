import React, { Component } from 'react';
import { default as MUISelectField } from 'material-ui/SelectField';

export default class SelectField extends Component {

  render() {
    const {
      input: { onChange, ...inputProps },
      label,
      ...other,
    } = this.props;

    return (
      <MUISelectField
        {...inputProps}
        {...other}
        onChange={(event, index, value) => onChange(value)}
        floatingLabelText={label}
        floatingLabelFixed={label !== undefined}
      >
        {this.props.children}
      </MUISelectField>
    );
  }

}
