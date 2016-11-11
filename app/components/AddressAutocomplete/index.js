import React from 'react';
import Autocomplete from 'components/Autocomplete';
import { load } from './actions';
import { connect } from 'react-redux';

export class AddressAutocomplete extends React.Component {
  static defaultProps = {
    input: {
      onChange: () => {
      },
    },
    dataSource: [],
  };

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(text) {
    this.props.dispatch(load(text));
    this.props.input.onChange(text);
  }

  render() {
    const {
      input: {
        onChange, // eslint-disable-line no-unused-vars
        ...inputProps,
      },
      ...other,
    } = this.props;

    return (
      <Autocomplete
        input={{ onChange: this.handleChange, ...inputProps }}
        {...other}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  dataSource: state.getIn(['addressAutocomplete', 'suggestions']),
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddressAutocomplete);
