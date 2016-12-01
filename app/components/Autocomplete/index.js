import React, { Component, PropTypes } from 'react';
import { default as MUIAutocomplete } from 'material-ui/AutoComplete';
import Button from 'components/Button';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import styles from './styles.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { minBlack } from 'material-ui/styles/colors';

const {
  noFilter,
  caseSensitiveFilter,
  caseInsensitiveFilter,
  fuzzyFilter,
} = MUIAutocomplete;

const caseInsensitiveStartsWithFilter = (searchText, value) => value.toLowerCase().indexOf(searchText.toLowerCase()) === 0;

export const filters = {
  caseSensitiveFilter,
  caseInsensitiveFilter,
  caseInsensitiveStartsWithFilter,
  fuzzyFilter,
  noFilter,
};

export default class Autocomplete extends Component {

  static defaultProps = {
    input: {
      onChange: () => {
      },
    },
    filter: caseInsensitiveFilter,
    fullWidth: true,
    noFreetext: false,
  };

  static propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    withClear: PropTypes.bool,
    onClear: PropTypes.func,
    noFreetext: PropTypes.bool,
  };

  constructor() {
    super();
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleNewRequest(searchText, key) {
    if (key !== -1) {
      const { text } = searchText;
      this.props.input.onChange(text);
    }
  }

  handleInputUpdate(searchText) {
    if (!this.props.noFreetext) {
      this.props.input.onChange(searchText);
    }
  }


  handleClear() {
    this.props.onClear();
    this.muiAutocomplete.focus();
  }

  render() {
    const {
      input: { value, ...inputProps },
      meta: { touched, error },
      label,
      withClear,
      onClear, // eslint-disable-line no-unused-vars
      noFreetext, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const rootClassnames = {
      withClear,
    };

    const clearButton = (
      <Button
        onClick={this.handleClear}
        className={styles.clearButton}
        icon={<CloseIcon color={minBlack} />}
      />
    );

    return (
      <div className={cx(rootClassnames)}>
        <MUIAutocomplete
          ref={ref => (this.muiAutocomplete = ref)}
          floatingLabelText={label}
          floatingLabelFixed={label !== undefined}
          errorText={touched && error}
          {...inputProps}
          searchText={value}
          onNewRequest={this.handleNewRequest}
          onUpdateInput={this.handleInputUpdate}
          {...other}
        />
        { withClear ? clearButton : null }

      </div>

    );
  }
}
