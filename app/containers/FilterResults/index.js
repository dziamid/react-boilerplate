/*
 *
 * FilterResults
 *
 */

import React, { Component } from 'react';
import styles from './styles.css';
import seniorities from 'mocks/seniorities';
import Button from 'components/Button';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

import {
  Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
}
  from 'material-ui/Table';


export default class FilterResults extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleAddRelation = this.handleAddRelation.bind(this);
    this.getRelations = this.getRelations.bind(this);
    this.showAddRelationButton = this.showAddRelationButton.bind(this);
  }

  handleRowSelection(indexes) {
    const selectedTitle = indexes.length > 0 ? this.props.results[indexes[0]].id : null;
    this.props.onRowSelection(selectedTitle);
  }

  handleAddRelation(title) {
    if (this.props.selectedTitle) {
      this.props.onAddRelation(this.props.selectedTitle, title.id);
    }
  }

  hasRelation(titleA, titleB) {
    return this.props.relations.find(r => r.jobTitleId === titleA && r.neighborId === titleB);
  }

  getRelations(title) {
    return this.props.relations.filter(r => r.jobTitleId === title.id);
  }

  showAddRelationButton(title) {
    const { selectedTitle } = this.props;

    return selectedTitle &&
      selectedTitle !== title.id && !this.hasRelation(title.id, selectedTitle);
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

    const addIcon = <AddIcon />;

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
            <TableHeaderColumn colSpan="2">Relations</TableHeaderColumn>
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
              { `Displaying ${results.length || '0'} out of ${titlesTotal || '0'} Titles` }
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}
