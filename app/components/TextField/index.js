import React, { PropTypes } from 'react';
import { default as MUITextField } from 'material-ui/TextField';
import styles from './styles.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const TextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  const { labelPosition } = custom;
  const withLeftLabel = labelPosition === 'left';
  const floatingLabel = !withLeftLabel ? label : undefined;

  const rootClassnames = {
    withLeftLabel,
  };

  return (
    <div className={cx(rootClassnames)}>
      {withLeftLabel ? <label>{label}</label> : null}

      <MUITextField
        floatingLabelText={floatingLabel}
        floatingLabelFixed={floatingLabel !== undefined}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    </div>
  );
};

TextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
};

export default TextField;
