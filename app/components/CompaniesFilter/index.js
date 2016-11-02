import React, { PropTypes } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import RadioButtonOn from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonOff from 'material-ui/svg-icons/toggle/radio-button-unchecked';

export default class CompaniesFilter extends React.Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(event, value) {
    if (value === undefined) {
      return;
    }

    console.log(`will change companies filter to: ${value}`);
    this.props.onFilterChange(value);
  }

  radioIcon(value) {
    return value === this.props.value ? <RadioButtonOn /> : <RadioButtonOff />;
  }

  render() {
    return (
      <Popover open>
        <Menu value={this.props.value} onChange={this.handleFilterChange} openImmediately>
          <MenuItem
            value="all"
            primaryText="Show All Companies"
            leftIcon={this.radioIcon('all')}
          />
          <Divider inset />
          <MenuItem
            value="custom"
            primaryText="Show Selected Companies"
            leftIcon={this.radioIcon('custom')}
          />
          <Divider inset />
          <MenuItem
            value="favorite"
            primaryText="Show Favorite Companies"
            leftIcon={this.radioIcon('favorite')}
          />
          <Divider />

          <MenuItem primaryText="Manage Companies" />
          <MenuItem primaryText="Add New Company" />
        </Menu>
      </Popover>

    );
  }
}
