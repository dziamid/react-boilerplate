import React from 'react';
import ItemDescription from './ItemDescription';
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

  render() {
    let sortedJobs;
    if (this.state.sort === null) {
      sortedJobs = this.props.items;
    } else {
      sortedJobs = this.props.items.sort((a, b) => {
        if (typeof a[this.state.sort] === 'string') {
          if (a[this.state.sort].toLowerCase() < b[this.state.sort].toLowerCase()) {
            return -1;
          }

          if (a[this.state.sort].toLowerCase() > b[this.state.sort].toLowerCase()) {
            return 1;
          }
          return 0;
        }
        return b[this.state.sort] - a[this.state.sort];
      });
    }
    const filteredItems = sortedJobs.filter((item) => { return item[this.props.filterBy].toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; });

    const searchIconStyle = {
      position: 'absolute',
      top: '13px',
      right: '3px',
      width: 22,
      height: 22,
    };

    const style = {
      fontSize: '13px',
      color: grey400,
      margin: '0 0 0 10px',
    };

    return (
      <div className={styles.wrapper}>
        <div className={styles.input_container}>
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
              {this.props.sortBy.map((field, index) => <MenuItem style={style} value={field} primaryText={field} key={index} />)}
            </SelectField>
          </div>
        </div>
        <div>
          <List>
              {filteredItems.map((item, index) => <ItemDescription item={item} key={index} />)}
          </List>
        </div>
      </div>
    );
  }
}
