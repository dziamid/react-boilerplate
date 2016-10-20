import React, { PropTypes } from 'react';
import { default as MUICheckbox } from 'material-ui/Checkbox';

function Checkbox(props) {
  const {
    input: { onChange, value, ...inputProps },
    meta, // eslint-disable-line no-unused-vars
    ...other,
  } = props;

  const { label } = other;

  return (
    <MUICheckbox
      labelPosition={label ? 'left' : undefined}
      checked={Boolean(value)}
      onCheck={onChange}
      {...inputProps}
      {...other}
    />
  );
}

Checkbox.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default Checkbox;
