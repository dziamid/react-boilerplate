import React, { PropTypes, Component } from 'react';

import AppBar from 'material-ui/AppBar';
import styles from './styles.css';
import LogoIcon from 'material-ui/svg-icons/image/camera';

class Header extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    return (
      <header className={styles.header}>
        <AppBar
          title="NOVIOPUS"
          iconElementLeft={
            <LogoIcon
              className={styles.logoIcon}
              color={this.context.muiTheme.palette.alternateTextColor}
            />
          }
        />
      </header>
    );
  }

}

export default Header;
