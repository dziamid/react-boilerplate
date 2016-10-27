import React, { PropTypes } from 'react';
import { default as MUITextField } from 'material-ui/TextField';
import Button from 'components/Button';
import styles from './styles.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const TextField = (props) => {
  const { input, label, onClear, withClear, labelPosition, meta: { touched, error }, ...other } = props;
  const withLeftLabel = labelPosition === 'left';
  const floatingLabel = !withLeftLabel ? label : undefined;

  const rootClassnames = {
    withLeftLabel,
    withClear,
  };

  return (
    <div className={cx(rootClassnames)}>
      {withLeftLabel ? <label>{label}</label> : null}

      <MUITextField
        floatingLabelText={floatingLabel}
        floatingLabelFixed={floatingLabel !== undefined}
        errorText={touched && error}
        {...input}
        {...other}
      />

      {withClear ? <Button onClick={onClear} className={styles.clearButton} icon="close" /> : null }

    </div>
  );
};

TextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  withClear: PropTypes.bool,
  onClear: PropTypes.func,
};

export default TextField;
