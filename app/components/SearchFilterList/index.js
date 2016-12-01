import React from 'react';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import TextField from 'components/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { List } from 'material-ui/List';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { grey400 } from 'material-ui/styles/colors';

import styles from './index.css';

export default class SearchFilterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      sort: null,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  handleSearch(e) {
    this.setState({
      search: e.target.value,
    });
  }

  handleSort(e, i, v) {
    this.setState({
      sort: v,
    });
  }

  renderItems(title, items, groupIndex) {
    let sortedItems;

    if (this.state.sort === null) {
      sortedItems = items;
    } else {
      sortedItems = items.sort((a, b) => {
        if (typeof a[this.state.sort] === 'string') {
          if (a[this.state.sort].toLowerCase() < b[this.state.sort].toLowerCase()) {
            return -1;
          }
          if (a[this.state.sort].toLowerCase() > b[this.state.sort].toLowerCase()) {
            return 1;
          }
          return 0;
        }
        return a[this.state.sort] - b[this.state.sort];
      });
    }
    const filteredItems = sortedItems.filter((item) => item[this.props.filterBy].toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
    const Item = this.props.itemType;

    return (
      filteredItems.length > 0 ? (
        <div className={styles.list}>
          { groupIndex > 0 ? <Divider /> : null }
          <List>
            <Subheader>{title}</Subheader>
            {filteredItems.map((item, index) =>
              <div key={index}>
                <Item {...item} />
              </div>
            )}
          </List>
        </div>
      ) : null
    );
  }

  render() {
    const searchIconStyle = {
      position: 'absolute',
      top: '13px',
      right: '3px',
      width: 22,
      height: 22,
    };

    const {
      groups,
    } = this.props;

    const style = {
      fontSize: '13px',
      color: grey400,
    };

    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.search}>
            <TextField
              type="text"
              hintText={`Search by ${this.props.filterBy}`}
              hintStyle={style}
              inputStyle={style}
              name="search field"
              value={this.state.search}
              onChange={this.handleSearch}
            />
            <ActionSearch
              style={searchIconStyle}
              color={grey400}
            />
          </div>
          <div className={styles.sort}>
            <SelectField
              hintText="Sort by"
              hintStyle={style}
              menuStyle={style}
              style={style}
              value={this.state.sort}
              onChange={this.handleSort}
            >
              {this.props.sortBy.map((field, index) =>
                <MenuItem style={style} value={field} primaryText={field} key={index} />
              )}
            </SelectField>
          </div>
        </div>
        {groups.map(({ title, items }, index) =>
          <div className={styles.item} key={index}>
            {this.renderItems(title, items, index)}
          </div>
        )}
      </div>
    );
  }
}
