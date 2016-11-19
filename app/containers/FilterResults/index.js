/*
 *
 * FilterResults
 *
 */

import React, { Component } from 'react';
import selectFilterParams from 'containers/FilterParams/selectors';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';

import { setSelectedTitle } from './actions';
import { updateTitle, addRelation } from 'containers/FilterParams/actions';

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Button from 'components/Button';
import { uniqBy } from 'lodash';

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
  }

  handleRowSelection(jobTitle) {
    if (jobTitle) {
      this.props.setSelectedTitle(jobTitle._id);
    }
  }

  handleAddRelation(jobTitle) {
    if (this.props.selectedTitle) {
      this.props.addRelation(this.props.selectedTitle, jobTitle._id);
    }
  }

  hasRelation(titleA, titleB) {
    return this.props.relations.find(r => r.indexOf(titleA) !== -1 && r.indexOf(titleB) !== -1);
  }

  getRelations(jobTitle) {
    return this.props.relations.filter(r => r.indexOf(jobTitle._id) !== -1); // use selector
  }

  render() {
    const {
      filterParams: {
        titles = [], // todo: use selector for results filtering
      },
      filterText,
      selectedTitle,
    } = this.props;

    let results = titles.filter(t => t.title.toLowerCase().includes((filterText || '').trim()))
      .slice(0, 20);

    results = uniqBy(results, r => r.title);

    const statusLine = `Displaying ${titles.length} out of ${results.length} Titles`;

    return (
      <Table
        onRowSelection={indexes => this.handleRowSelection(results[indexes[0]])}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn className={styles.titleColumn}>Title</TableHeaderColumn>
            <TableHeaderColumn>Seniority</TableHeaderColumn>
            <TableHeaderColumn colSpan="2">Relations</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map(job =>
            <TableRow
              key={job._id}
              selected={job._id === selectedTitle}
            >
              <TableRowColumn className={styles.titleColumn}>{job.title}</TableRowColumn>
              <TableRowColumn>{getSeniorityName(job.title)}</TableRowColumn>
              <TableRowColumn>
                { selectedTitle && !this.hasRelation(job._id, selectedTitle) ? (
                  <Button
                    raised
                    className={styles.addButton}
                    onClick={e => e.stopPropagation() || this.handleAddRelation(job)}
                  > + </Button>
                ) : null }

              </TableRowColumn>
              <TableRowColumn>
                { this.getRelations(job).size || '0' }
              </TableRowColumn>
            </TableRow>
          )}

        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn colSpan="4" style={{ textAlign: 'left' }}>
              { statusLine }
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  filterParams: selectFilterParams(),
  filterText: (state) => state.getIn(['form', 'FilterParams', 'values', 'filter']),
  selectedTitle: (state) => {
    return state.getIn(['titlesEditorRoot', 'filterResults', 'selectedTitle']);
  },
  relations: state => state.getIn(['titlesEditorRoot', 'filterParams', 'relations']),
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
