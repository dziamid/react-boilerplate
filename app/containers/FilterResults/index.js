/*
 *
 * FilterResults
 *
 */

import React, { Component } from 'react';
import * as selectors from './selectors';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import { setSelectedTitle, addRelation } from 'containers/TitlesEditor/actions';
import { getSeniorityName } from 'containers/TitlesEditor/constants';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Button from 'components/Button';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

import {
  Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
}
  from 'material-ui/Table';


export class FilterResults extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleAddRelation = this.handleAddRelation.bind(this);
    this.getRelations = this.getRelations.bind(this);
    this.showAddRelationButton = this.showAddRelationButton.bind(this);
    // todo: use autobind
  }

  handleRowSelection(indexes) {
    console.log('handleRowSelection', indexes);
    const selectedTitle = indexes.length > 0 ? this.props.results[indexes[0]].id : null;
    this.props.setSelectedTitle(selectedTitle);
  }

  handleAddRelation(title) {
    if (this.props.selectedTitle) {
      this.props.addRelation(this.props.selectedTitle, title.id);
    }
  }

  hasRelation(titleA, titleB) {
    return this.props.relations.find(r => r.indexOf(titleA) !== -1 && r.indexOf(titleB) !== -1);
  }

  getRelations(title) {
    return this.props.relations.filter(r => r.indexOf(title.id) !== -1); // use selector
  }

  showAddRelationButton(title) {
    const { selectedTitle } = this.props;

    return selectedTitle &&
      selectedTitle !== title.id && !this.hasRelation(title.id, selectedTitle);
  }

  render() {
    const {
      selectedTitle,
      titles,
      results,
    } = this.props;

    const addIcon = <AddIcon />;

    return (
      <Table
        onRowSelection={this.handleRowSelection}
      >
        <TableHeader displaySelectAll={false} adjustForCheckbox>
          <TableRow>
            <TableHeaderColumn className={styles.titleColumn}>Title</TableHeaderColumn>
            <TableHeaderColumn>Seniority</TableHeaderColumn>
            <TableHeaderColumn colSpan="2">Relations</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {results.map(title =>
            <TableRow
              key={title.id}
              selected={title.id === selectedTitle}
            >
              <TableRowColumn className={styles.titleColumn}>{title.name}</TableRowColumn>
              <TableRowColumn>{getSeniorityName(title.name)}</TableRowColumn>
              <TableRowColumn>
                { this.showAddRelationButton(title) ? (
                  <Button
                    icon={addIcon}
                    className={styles.addButton}
                    onClick={e => e.stopPropagation() || this.handleAddRelation(title)}
                  />
                ) : null }

              </TableRowColumn>
              <TableRowColumn>
                { this.getRelations(title).size || '0' }
              </TableRowColumn>
            </TableRow>
          )}

        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn colSpan="4" style={{ textAlign: 'left' }}>
              { `Displaying ${results.length || '0'} out of ${titles.length || '0'} Titles` }
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  results: selectors.results(),
  titles: selectors.titles(),
  selectedTitle: selectors.selectedTitle(),
  relations: selectors.relations(),
});

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTitle: (titleId) => dispatch(setSelectedTitle(titleId)),
    addRelation: (titleId, rel) => dispatch(addRelation(titleId, rel)),
  };
}

const validate = (values) => {
  const errors = {};

  if (!values.get('field1')) {
    errors.field1 = 'Required';
  }

  return errors;
};

const form = reduxForm({ form: 'filterResults', validate })(FilterResults);
export default connect(mapStateToProps, mapDispatchToProps)(form);
