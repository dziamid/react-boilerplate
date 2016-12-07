import * as React from 'react';
import Autocomplete from 'components/Autocomplete';
import {load} from './actions';
const {connect} = require('react-redux');
import {Dispatch, Action} from 'redux';
import {Map} from 'immutable';
import {omit} from 'lodash';

export interface IAddressAutocompleteProps extends __MaterialUI.AutoCompleteProps {
  dispatch: Dispatch<Action>,
  input?: {
    onChange: (text: string) => void,
  },
}

export class AddressAutocomplete extends React.Component<IAddressAutocompleteProps, {}> {
  static defaultProps = {
    input: {
      onChange: () => {
      },
    },
  };

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(text: string) {
    this.props.dispatch(load(text));
    this.props.input.onChange(text);
  }

  render() {
    const other = omit(this.props, 'input', 'dispatch', 'dataSource');
    const inputProps = omit(this.props.input, 'onChange');

    return (
      <Autocomplete
        dataSource={this.props.dataSource}
        input={{ onChange: this.handleChange, ...inputProps }}
        {...other}
      />
    );
  }
}

const mapStateToProps = (state: Map<string,any>, props: Object) => ({
  dataSource: state.getIn(['addressAutocomplete', 'suggestions']),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressAutocomplete);
