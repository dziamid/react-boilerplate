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
      relevant,
      leftIcon,
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

    return (
      <ListItem>
        <div className={styles.wrapper}>
          <div className={styles.list_left}>
            { leftIcon }
            <IconButton disableTouchRipple iconStyle={iconStyle} style={btnStyle}>
              <NotificationEventNote color={grey400} />
            </IconButton>
            <span className={styles.item_name}>{name}</span> - {location}, {position}, {relevant}
          </div>
          <div>{date} {time}</div>
        </div>
      </ListItem>
    );
  }
}

