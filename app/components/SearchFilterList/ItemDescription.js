import React from 'react';
import styles from './ItemDescription.css';
import NotificationEventNote from 'material-ui/svg-icons/notification/event-note';
import { ListItem } from 'material-ui/List';
import { grey400 } from 'material-ui/styles/colors';

export default class ItemDescription extends React.Component {

  render() {
    const iconStyle = {
      margin: '-3px 5px 0 0',
      width: 16,
      height: 16,
    };
    return (
      <ListItem>
        <div className={styles.list_wrapper}>
          <div className={styles.list_left}>
            <NotificationEventNote
              style={iconStyle}
              color={grey400}
            />
            <span className={styles.item_name}>{this.props.item.name}</span> - {this.props.item.location}, {this.props.item.position}
          </div>
          <div>{this.props.item.date} {this.props.item.time}</div>
        </div>
      </ListItem>
    );
  }
}
