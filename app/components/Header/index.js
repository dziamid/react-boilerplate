import React, { PropTypes, Component } from 'react';

import AppBar from 'material-ui/AppBar';
import styles from './styles.css';
import Button from 'components/Button';
import muiThemeable from 'material-ui/styles/muiThemeable';

import AddIcon from 'material-ui/svg-icons/content/add';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import ActivityIcon from 'material-ui/svg-icons/av/playlist-add-check';
import Avatar from 'material-ui/Avatar';
import sampleAvatar from 'components/common/images/sample-avatar.jpg';
import { white } from 'material-ui/styles/colors';
import Popover from 'material-ui/Popover';
import AddMenu from './AddMenu';

class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      addPopoverOpen: false,
      addPopoverAnchor: null,
    };

    this.openAddPopover = this.openAddPopover.bind(this);
    this.closeAddPopover = this.closeAddPopover.bind(this);
  }

  openAddPopover(event) {
    this.setState({
      addPopoverOpen: !this.state.addPopoverOpen,
      addPopoverAnchor: event.currentTarget,
    });
  }

  closeAddPopover() {
    this.setState({
      addPopoverOpen: false,
    });
  }


  render() {
    const loggedIn = this.props.user !== undefined;

    const actions = (
      <div className={styles.actions}>
        <div>
          <Button icon={<AddIcon color={white} />} onClick={this.openAddPopover} />
          <Popover
            open={this.state.addPopoverOpen}
            anchorEl={this.state.addPopoverAnchor}
            onRequestClose={this.closeAddPopover}
          >
            <AddMenu onItemTouchTap={this.closeAddPopover} />
          </Popover>
        </div>

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
          iconElementRight={loggedIn ? actions : null}
        />
      </header>
    );
  }

}

export default muiThemeable()(Header);
