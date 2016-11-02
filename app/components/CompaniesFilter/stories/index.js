import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CompaniesFilter from '../index';

class Header extends Component {
  constructor() {
    super();
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = {
      value: 'custom',
    };
  }

  handleFilterChange(value) {
    this.setState({ value });
    action('onFilterChange')(value);
  }

  render() {
    const props = {
      value: this.state.value,
      onFilterChange: this.handleFilterChange,
    };

    return (
      <div>
        {React.cloneElement(this.props.children, props)}
      </div>
    );
  }
}

storiesOf('CompaniesFilter', module)
  .addDecorator((getStory) => <Header>{getStory()}</Header>)
  .add('open', () => (
    <CompaniesFilter />
  ));
