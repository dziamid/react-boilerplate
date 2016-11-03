import React, { PropTypes } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import RadioButtonOn from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonOff from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import AddIcon from 'material-ui/svg-icons/content/add';
import styles from './styles.css';

export default class CompaniesFilter extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    onFilterChange: PropTypes.func.isRequired,
    onCompanySelected: PropTypes.func.isRequired,
    onCompanyUnselected: PropTypes.func.isRequired,
    selectedCompanies: PropTypes.array,
    companies: PropTypes.array,
  };

  static defaultProps = {
    value: 'all',
    selectedCompanies: [],
    companies: [],
  };

  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleCompanyChanged = this.handleCompanyChanged.bind(this);
  }

  handleFilterChange(event, value) {
    if (value === undefined) {
      return;
    }

    this.props.onFilterChange(value);
  }

  handleCompanyChanged(company, isSelected) {
    const prop = isSelected ? this.props.onCompanySelected : this.props.onCompanyUnselected;
    prop(company);
  }

  radioIcon(value) {
    return value === this.props.value ? <RadioButtonOn /> : <RadioButtonOff />;
  }

  render() {
    const customMenuItems = this.props.value === 'custom' ? (
      <div data-id="companies" className={styles.companies}>
        { this.props.companies.map((c, i) => (
          <Checkbox
            key={i}
            label={c.name}
            value={c.id}
            onCheck={(event, isChecked) => this.handleCompanyChanged(c, isChecked)}
            checked={this.props.selectedCompanies.includes(c)}
          />
        ))}
      </div>
    ) : null;

    return (
      <Menu value={this.props.value} onChange={this.handleFilterChange}>
        <MenuItem
          onTouchTap={() => console.log('MenuItem.onTouchTap')}
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
        { customMenuItems }

        <Divider inset />
        <MenuItem
          value="favorite"
          primaryText="Show Favorite Companies"
          leftIcon={this.radioIcon('favorite')}
        />
        <Divider />
        <MenuItem
          primaryText="Manage Companies"
          leftIcon={<SettingsIcon />}
        />
        <Divider />
        <MenuItem
          primaryText="Add New Company"
          leftIcon={<AddIcon />}
        />
      </Menu>

    );
  }
}
