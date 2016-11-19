/*
 *
 * FilterResults
 *
 */

import React, { Component } from 'react';
import * as selectors from './selectors';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';

import { setSelectedTitle } from './actions';
import { updateTitle, addRelation } from 'containers/FilterParams/actions';

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Button from 'components/Button';

import {
  Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
}
  from 'material-ui/Table';

import { getSeniorityName } from 'containers/SingleTitleEditor/constants';

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
    const selectedTitle = indexes.length > 0 ? this.props.results[indexes[0]]._id : null;
    this.props.setSelectedTitle(selectedTitle);
  }

  handleAddRelation(title) {
    if (this.props.selectedTitle) {
      this.props.addRelation(this.props.selectedTitle, title._id);
    }
  }

  hasRelation(titleA, titleB) {
    return this.props.relations.find(r => r.indexOf(titleA) !== -1 && r.indexOf(titleB) !== -1);
  }

  getRelations(title) {
    return this.props.relations.filter(r => r.indexOf(title._id) !== -1); // use selector
  }

  showAddRelationButton(title) {
    const { selectedTitle } = this.props;

    return selectedTitle &&
      selectedTitle !== title._id && !this.hasRelation(title._id, selectedTitle);
  }

  render() {
    const {
      selectedTitle,
      titles,
      results,
    } = this.props;

    return (
      <Table
        onRowSelection={this.handleRowSelection}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn className={styles.titleColumn}>Title</TableHeaderColumn>
            <TableHeaderColumn>Seniority</TableHeaderColumn>
            <TableHeaderColumn colSpan="2">Relations</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map(title =>
            <TableRow
              key={title._id}
              selected={title._id === selectedTitle}
            >
              <TableRowColumn className={styles.titleColumn}>{title.title}</TableRowColumn>
              <TableRowColumn>{getSeniorityName(title.title)}</TableRowColumn>
              <TableRowColumn>
                { this.showAddRelationButton(title) ? (
                  <Button
                    raised
                    className={styles.addButton}
                    onClick={e => e.stopPropagation() || this.handleAddRelation(title)}
                  > + </Button>
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
    updateTitle: (id, title) => dispatch(updateTitle(id, title)),
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
