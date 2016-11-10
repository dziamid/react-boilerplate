import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TextField from '../index';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };
  }

  hanleChange(value) {
    action('onChange')(value);
    this.setState({ value });
  }

  handleClear() {
    action('onClear')();
    this.setState({ value: '' });
  }

  render() {
    const props = {
      input: {
        onChange: e => this.hanleChange(e.target.value),
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


storiesOf('TextField', module)
  .addDecorator(getStory => <Form>{getStory()}</Form>)

  .add('default', () => (
    <TextField label="Label on the top" />
  ))
  .add('with label on the left', () => (
    <TextField label="Label on the left" labelPosition="left" />
  ))
  .add('with clear icon', () => (
    <TextField label="Label on the left" withClear onClear={action('will clear input')} />
  ));
