import React, { PropTypes, Component } from 'react';

import AppBar from 'material-ui/AppBar';
import styles from './styles.css';
import Button from 'components/Button';
import muiThemeable from 'material-ui/styles/muiThemeable';

import AddIcon from 'material-ui/svg-icons/content/add';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import ActivityIcon from 'material-ui/svg-icons/av/playlist-add-check';
import AllCompaniesIcon from 'material-ui/svg-icons/action/account-balance';
import Avatar from 'material-ui/Avatar';
import sampleAvatar from 'components/common/images/sample-avatar.jpg';
import { white } from 'material-ui/styles/colors';
import Popover from 'material-ui/Popover';
import Drawer from 'material-ui/Drawer';
import AddMenu from './AddMenu';
import Navigation from 'components/Navigation';
import CompaniesFilter from 'components/CompaniesFilter';
import { connect } from 'react-redux';

class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      addPopover: { open: false, anchor: null },
      companiesPopover: { open: false, anchor: null },
      navigationOpen: false,
    };

    this.registerPopover('addPopover');
    this.registerPopover('companiesPopover');

    this.openNavigation = this.openNavigation.bind(this);
    this.closeNavigation = this.closeNavigation.bind(this);
  }

  registerPopover(name) {
    this[name] = {
      open: (event) => {
        this.setState({
          [name]: { open: true, anchor: event.currentTarget },
        });
      },
      close: () => {
        this.setState({
          [name]: { open: false },
        });
      },
    };
    this[name].open = this[name].open.bind(this);
    this[name].close = this[name].close.bind(this);
  }

  openNavigation() {
    this.setState({
      navigationOpen: true,
    });
  }

  closeNavigation() {
    this.setState({
      navigationOpen: false,
    });
  }

  getFilterButtonLabel() { // todo: move to a computed selector
    const { value, companies } = this.props.companiesFilter;
    if (value === 'all') {
      return 'All Companies';
    } else if (value === 'favorite') {
      return 'Favorite Companies';
    } else if (value === 'custom' && companies.length > 1) {
      return 'Some Companies';
    } else if (value === 'custom' && companies.length === 1) {
      return companies[0].name;
    }

    return 'No Companies';
  }

  render() {
    const loggedIn = this.props.user !== undefined;

    const actions = (
      <div className={styles.actions}>
        <Button
          onClick={this.companiesPopover.open}
          label={this.getFilterButtonLabel()}
          icon={<AllCompaniesIcon />}
          style={{ color: 'white' }}
        />
        <Popover
          open={this.state.companiesPopover.open}
          anchorEl={this.state.companiesPopover.anchor}
          anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
          onRequestClose={this.companiesPopover.close}
        >
          <CompaniesFilter companies={this.props.companies} />
        </Popover>
        <Button icon={<AddIcon color={white} />} onClick={this.addPopover.open} />
        <Popover
          open={this.state.addPopover.open}
          anchorEl={this.state.addPopover.anchor}
          anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
          onRequestClose={this.addPopover.close}
        >
          <AddMenu onItemTouchTap={this.addPopover.close} />
        </Popover>
        <Button icon={<NotificationsIcon color={white} />} />
        <Button
          icon={<Avatar src={sampleAvatar} size={32} />}
          style={{ padding: 8 }}
        />
        <Button icon={<ActivityIcon color={white} />} />
      </div>
    );

    return (
      <header className={styles.header}>
        <AppBar
          title="NOVIOPUS"
          onLeftIconButtonTouchTap={this.openNavigation}
          iconElementRight={loggedIn ? actions : null}
        />
        <Drawer
          docked={false}
          open={this.state.navigationOpen}
          onRequestChange={this.closeNavigation}
        >
          <Navigation onItemTouchTap={this.closeNavigation} />
        </Drawer>
      </header>
    );
  }

}

const mapStateToProps = (state) => ({
  companiesFilter: state.get('companiesFilter').toJS(), // todo: use selectors instead
  companies: state.get('companies'),
});

export default connect(mapStateToProps, null)(muiThemeable()(Header));
