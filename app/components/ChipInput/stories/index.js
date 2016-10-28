import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ChipInput from '../index';
import countries from 'components/common/stories/countries';

class Form extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: ['Belarus'],
    };
  }

  onChange(value) {
    this.setState({ value });
    action('onChange')(value);
  }

  render() {
    const props = {
      input: {
        name: 'field1',
        value: this.state.value,
        onChange: this.onChange,
        onBlur: () => {},
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


storiesOf('ChipInput', module)
  .addDecorator(getStory => <Form>{getStory()}</Form>)
  .add('freetext only', () => (
    <ChipInput
      label="Input countries"
    />
  ))
  .add('autocomplete, freetext allowed', () => (
    <ChipInput
      dataSource={countries.map(c => c.name)}
      label="Input countries"
    />
  ))
  .add('autocomplete, freetext not allowed', () => (
    <ChipInput
      dataSource={countries.map(c => c.name)}
      label="Input countries"
      freetextDisabled
    />
  ));
