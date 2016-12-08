import * as React from 'react';
import * as MUI from 'material-ui';
const Button = require('components/Button').default;
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import {omit} from 'lodash';
const styles = require('./styles.css');
const classNames = require('classnames/bind'); //todo: load classnames typings
const cx = classNames.bind(styles);
import {minBlack} from 'material-ui/styles/colors';

const {
  noFilter,
  caseSensitiveFilter,
  caseInsensitiveFilter,
  fuzzyFilter,
} = MUI.AutoComplete;

const caseInsensitiveStartsWithFilter = (searchText: string, value: string) => value.toLowerCase().indexOf(searchText.toLowerCase()) === 0;

export const filters = {
  caseSensitiveFilter,
  caseInsensitiveFilter,
  caseInsensitiveStartsWithFilter,
  fuzzyFilter,
  noFilter,
};

export interface IAutocompleteProps extends __MaterialUI.AutoCompleteProps {
  input?: {
    value?: any,
    onChange: (text: string) => void,
  },
  meta?: {
    touched: any,
    error: any,
  },
  withClear?: boolean,
  onClear?: () => void,
  noFreetext?: boolean,
  label?: string,
}

export default class Autocomplete extends React.Component<IAutocompleteProps, {}> {

  static defaultProps = {
    input: {
      onChange: () => {
      },
    },
    filter: caseInsensitiveFilter,
    fullWidth: true,
    noFreetext: false,
    withClear: false,
  };

  private muiAutocomplete: any;

  constructor() {
    super();
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleNewRequest(chosenRequest: string, index: number) {
    if (index !== -1) {
      this.props.input.onChange(chosenRequest);
    }
  }

  handleInputUpdate(searchText: string) {
    if (!this.props.noFreetext) {
      this.props.input.onChange(searchText);
    }
  }


  handleClear() {
    this.props.onClear();
    this.muiAutocomplete.focus();
  }

  render(): any {
    const {
      input: {value},
      meta: {touched, error},
      label,
      withClear,
      onClear,
      noFreetext,
    } = this.props;

    const proxyProps = omit(this.props, ['input', 'meta', 'label', 'withClear', 'onClear', 'noFreetext']);
    const inputProps = omit(this.props.input, ['value']);

    const rootClassnames = {
      withClear,
    };

    return (
      <div className={cx(rootClassnames)}>
        <MUI.AutoComplete
          ref={ref => { this.muiAutocomplete = ref}}
          floatingLabelText={label}
          errorText={touched && error}
          searchText={value}
          onNewRequest={this.handleNewRequest}
          onUpdateInput={this.handleInputUpdate}
          dataSource={this.props.dataSource}
          {...inputProps}
          {...proxyProps}
        />
        <Button
          onClick={this.handleClear}
          className={styles.clearButton}
          icon={<CloseIcon color={minBlack} />}
        />

      </div>

    );
  }
}
