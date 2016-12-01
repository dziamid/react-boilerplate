import React from 'react';
import NotificationEventNote from 'material-ui/svg-icons/notification/event-note';
import { ListItem } from 'material-ui/List';
import { grey400 } from 'material-ui/styles/colors';
import styles from './ItemDescription.css';
export default class ItemDescription extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      radioValue: null,
    };
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleRadioChange(e) {
    this.setState({
      radioValue: e.target.value,
    });
  }

  render() {
    const iconStyle = {
      margin: '-1px 5px 0 0',
      width: 16,
      height: 16,
    };

    return (
      <ListItem>
        <div className={styles.list_wrapper}>
          <div className={styles.list_left}>
            <input className={styles.radio} type="radio" name="radio" onChange={this.handleRadioChange} value={this.props.item.id} />
            <NotificationEventNote
              style={iconStyle}
              color={grey400}
            />
            <span className={styles.item_name}>{this.props.item.name}</span> - {this.props.item.location}, {this.props.item.position}, {this.props.item.relevant}
          </div>
          <div>{this.props.item.date} {this.props.item.time}</div>
        </div>
      </ListItem>
    );
  }
}

