import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import ChipInput from '../index';
// import countries from 'components/common/stories/countries';

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
  }

  render() {
    const props = {
      input: {
        name: 'field1',
        onChange: this.onChange,
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


storiesOf('ChipInput', module)
  .addDecorator(getStory => <Form>{getStory()}</Form>)
  .add('freetext', () => (
    <ChipInput
      // dataSource={countries.map(c => ({ text: c.name, value: c.code }))}
      label="Input countries"
    />
  ));
