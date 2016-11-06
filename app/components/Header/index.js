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

class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    const loggedIn = this.props.user !== undefined;

    const actions = (
      <div className={styles.actions}>
        <Button icon={<AddIcon color={white} />} />
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
          title="Noviopus"
          iconElementRight={loggedIn ? actions : null}
        />
      </header>
    );
  }

}

export default muiThemeable()(Header);
