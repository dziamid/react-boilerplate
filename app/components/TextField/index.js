import React, { PropTypes, Component } from 'react';
import { default as MUITextField } from 'material-ui/TextField';
import Button from 'components/Button';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import styles from './styles.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class TextField extends Component {
  constructor() {
    super();
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear() {
    this.props.onClear();
    this.muiTextField.focus();
  }

  render() {
    const {
      input,
      label,
      onClear, // eslint-disable-line no-unused-vars
      withClear,
      labelPosition,
      meta: { touched, error },
      ...other,
    } = this.props;

    const withLeftLabel = labelPosition === 'left';
    const floatingLabel = !withLeftLabel ? label : undefined;

    const rootClassnames = {
      withLeftLabel,
      withClear,
    };

    const clearButton = (
      <Button
        onClick={this.handleClear}
        className={styles.clearButton}
        icon={ <CloseIcon /> }
      />
    );

    return (
      <div className={cx(rootClassnames)}>
        {withLeftLabel ? <label>{label}</label> : null}

        <MUITextField
          ref={ref => (this.muiTextField = ref)}
          floatingLabelText={floatingLabel}
          floatingLabelFixed={floatingLabel !== undefined}
          errorText={touched && error}
          {...input}
          {...other}
        />
        { withClear ? clearButton : null }
      </div>
    );
  }

}


TextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  withClear: PropTypes.bool,
  onClear: PropTypes.func,
};

export default TextField;
