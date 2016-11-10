import React, { PropTypes } from 'react';
import { Checkbox as MUICheckbox } from 'material-ui';
import { omit } from 'lodash';


interface ICheckboxProps {
  input: any,
  meta: any,
}

function Checkbox(props: ICheckboxProps) {
  const { input, meta } = props;
  const { onChange, value } = input;
  const inputProps = omit(input, 'onChange', 'value');
  const other = omit(props, 'input', 'meta');

  return (
    <MUICheckbox
      checked={Boolean(value)}
      onCheck={onChange}
      {...inputProps}
      {...other}
    />
  );
}

export default Checkbox;
