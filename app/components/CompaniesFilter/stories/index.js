import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CompaniesFilter from '../index';
import without from 'lodash/without';
import Popover from 'material-ui/Popover';

const companies = ['Airbnb', 'Adidas', 'Tinder', 'Fedex'].map(c => ({ id: c, name: c }));

class Header extends Component {
  constructor() {
    super();
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleCompanySelected = this.handleCompanySelected.bind(this);
    this.handleCompanyUnselected = this.handleCompanyUnselected.bind(this);

    this.state = {
      value: 'custom',
      selectedCompanies: [companies[0]],
      companies,
    };
  }

  handleCompanySelected(company) {
    this.setState({
      selectedCompanies: [...this.state.selectedCompanies, company],
    });
  }

  handleCompanyUnselected(company) {
    this.setState({
      selectedCompanies: without(this.state.selectedCompanies, company),
    });
  }

  handleFilterChange(value) {
    this.setState({ value });
    action('onFilterChange')(value);
  }

  render() {
    const props = {
      value: this.state.value,
      companies: this.state.companies,
      selectedCompanies: this.state.selectedCompanies,
      onFilterChange: this.handleFilterChange,
      onCompanySelected: this.handleCompanySelected,
      onCompanyUnselected: this.handleCompanyUnselected,
    };

    return (
      <div>
        <Popover open>
          {React.cloneElement(this.props.children, props)}
        </Popover>
      </div>
    );
  }
}

storiesOf('CompaniesFilter', module)
  .addDecorator((getStory) => <Header>{getStory()}</Header>)
  .add('open', () => (
    <CompaniesFilter />
  ));
