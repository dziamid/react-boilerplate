import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Autocomplete from '../index';
import countries from 'components/common/stories/countries';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    const props = {
      input: {
        name: 'field1',
        onChange: action('onChange'),
        value: this.state.value,
      },
      meta: {},
    };
    return (
      <div>
        {React.cloneElement(this.props.children, props)}
      </div>
    );
  }
}


storiesOf('Autocomplete', module)
  .addDecorator(getStory => <Form>{getStory()}</Form>)
  .add('default', () => (
    <Autocomplete
      dataSource={countries.map(c => ({ text: c.name, value: c.code }))}
      label="Choose Country"
    />
  ))
  .add('with clear', () => (
    <Autocomplete
      dataSource={countries.map(c => ({ text: c.name, value: c.code }))}
      label="Choose Country"
      withClear
      onClear={action('onClear')}
    />
  ));
