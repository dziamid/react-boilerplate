import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import NotificationEventNote from 'material-ui/svg-icons/notification/event-note';
import { ListItem } from 'material-ui/List';
import { grey400 } from 'material-ui/styles/colors';
import styles from './index.css';

export default class ItemDescription extends React.Component {

  static PropTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.string,
    position: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
  };

  render() {
    const {
      name,
      location,
      position,
      date,
      time,
      leftIcon,
      onClick,
    } = this.props;

    const iconStyle = {
      width: 16,
      height: 16,
    };

    const btnStyle = {
      padding: 0,
      width: '28px',
      height: '28px',
      top: '-6px',
    };

    const innerDivStyle = {
      padding: '10px 0',
    };

    return (
      <ListItem onClick={onClick} innerDivStyle={innerDivStyle}>
        <div className={styles.wrapper}>
          <div className={styles.listLeft}>
            { leftIcon }
            <IconButton disableTouchRipple iconStyle={iconStyle} style={btnStyle}>
              <NotificationEventNote color={grey400} />
            </IconButton>
            <span className={styles.itemName}>{name}</span>
            <p className={styles.info}>- {location}, {position}</p>
          </div>
          <div className={styles.listRight}><p className={styles.date}>{date}</p><p className={styles.time}>{time}</p></div>
        </div>
      </ListItem>
    );
  }
}

