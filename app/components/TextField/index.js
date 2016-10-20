import React, { PropTypes } from 'react';
import { default as MUITextField } from 'material-ui/TextField';

const TextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <div>
    <MUITextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  </div>
);

TextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
};

export default TextField;
