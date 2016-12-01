/*
 *
 * FilterResults
 *
 */

import React, { Component } from 'react';
import styles from './styles.css';
import seniorities from 'mocks/seniorities';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';


export default class FilterResults extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.getRelations = this.getRelations.bind(this);
  }

  handleRowSelection(indexes) {
    const selectedTitle = indexes.length > 0 ? this.props.results.get(indexes[0]).id : null;
    this.props.onRowSelection(selectedTitle);
  }

  getRelations(title) {
    return this.props.relations.filter(r => r.jobTitleId === title.id);
  }

  getSeniorityName(value) {
    const seniority = seniorities.find(s => s.value === value);

    return seniority ? seniority.name : null;
  }

  render() {
    const {
      selectedTitle,
      titlesTotal,
      results,
    } = this.props;

    return (
      <Table
        onRowSelection={this.handleRowSelection}
      >
        <TableHeader displaySelectAll={false} adjustForCheckbox>
          <TableRow>
            <TableHeaderColumn className={styles.titleColumn}>
              Title
            </TableHeaderColumn>
            <TableHeaderColumn className={styles.seniorityColumn}>
              Seniority
            </TableHeaderColumn>
            <TableHeaderColumn className={styles.relationsColumn}>
              Relations
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn colSpan="3" style={{ textAlign: 'left' }}>
              { `Displaying ${results.size || '0'} out of ${titlesTotal || '0'} Titles` }
            </TableRowColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {results.map(title =>
            <TableRow
              key={title.id}
              selected={title.id === selectedTitle}
            >
              <TableRowColumn className={styles.titleColumn}>
                {title.name}
              </TableRowColumn>
              <TableRowColumn className={styles.seniorityColumn}>
                {this.getSeniorityName(title.seniority)}
              </TableRowColumn>
              <TableRowColumn className={styles.relationsColumn}>
                { this.getRelations(title).size || '0' }
              </TableRowColumn>
            </TableRow>
          )}

        </TableBody>
      </Table>
    );
  }
}
