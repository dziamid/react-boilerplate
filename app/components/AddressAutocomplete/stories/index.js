import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import AddressAutocomplete from '../index';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
    action('onChange')(value);
  }

  handleClear() {
    action('onClear')();
    this.setState({ value: '' });
  }

  render() {
    const props = {
      input: {
        name: 'field1',
        onChange: this.handleChange,
        value: this.state.value,
      },
      meta: {},
      onClear: () => this.handleClear(),
    };
    return (
      <div>
        {React.cloneElement(this.props.children, props)}
      </div>
    );
  }
}


storiesOf('AddressAutocomplete', module)
  .add('default', () => (
    <Form>
      <AddressAutocomplete label="Enter address" />
    </Form>

  ));
