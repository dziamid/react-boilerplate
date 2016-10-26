import React from 'react';
import { default as MUISelectField } from 'material-ui/SelectField';
import { mapError } from 'components/common/redux-form';

export default function SelectField(props) {
  const {
    input: { onChange, ...inputProps },
    label,
    ...other,
  } = props;

  return (
    <MUISelectField
      {...mapError(props)}
      {...inputProps}
      {...other}
      onChange={(event, index, value) => onChange(value)}
      floatingLabelText={label}
      floatingLabelFixed={label !== undefined}
    >
      {props.children}
    </MUISelectField>
  );
}
