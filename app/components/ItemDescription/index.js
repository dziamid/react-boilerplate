import React, { PropTypes } from 'react';
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
    const iconStyle = {
      margin: '-1px 5px 0 0',
      width: 16,
      height: 16,
    };

    const {
      name,
      location,
      position,
      date,
      time,
      relevant,
    } = this.props;

    return (
      <ListItem>
        <div className={styles.wrapper}>
          <div className={styles.list_left}>
            <NotificationEventNote
              style={iconStyle}
              color={grey400}
            />
            <span className={styles.item_name}>{name}</span> - {location}, {position}, {relevant}
          </div>
          <div>{date} {time}</div>
        </div>
      </ListItem>
    );
  }
}

