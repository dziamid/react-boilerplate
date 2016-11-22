/*
 *
 * SingleTitle
 *
 */

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import MenuItem from 'components/MenuItem';
import H3 from 'components/H3';
import { seniorities, proximities } from './constants';
import MUISelectField from 'material-ui/SelectField';

import { updateSeniority, updateProximity, removeRelation } from 'containers/FilterParams/actions';
import { difference, compact } from 'lodash';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import Button from 'components/Button';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
}
  from 'material-ui/Table';

export class SingleTitle extends Component {
  constructor(props) {
    super(props);

    // this.updateRelationProximity = this.updateRelationProximity.bind(this);
    this.updateSeniority = this.updateSeniority.bind(this);
    this.getRelations = this.getRelations.bind(this);
    this.updateRelationProximity = this.updateRelationProximity.bind(this);
  }

  updateRelationProximity(...args) {
    this.props.updateProximity(...args);
  }

  updateSeniority(seniorityKey) {
    this.selectedTitle.seniority = seniorityKey;
    this.props.updateSeniority(this.selectedTitle.id, seniorityKey);
    this.forceUpdate();
  }

  getRelations(title) {
    const relations = this.props.relations.filter(r => r.indexOf(title.id) !== -1); // todo: use selector
    const relatedIds = relations.map(r => difference(r, [title.id])[0]);

    const titles = relatedIds.map(id => this.props.titles.find(t => t.id === id));

    return titles.filter(t => t !== undefined);
  }

  render() {
    const { selectedTitle } = this.props;
    const relations = this.getRelations(selectedTitle);

    const seniorityOptions = seniorities.map(s => <MenuItem key={s.value} value={s.value} primaryText={s.name} />);
    const proximityOptions = proximities.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.name} />);

    this.selectedTitle = selectedTitle;

    return (
      <div className={styles.SingleTitle}>
        <H3>
          <div>{selectedTitle.title}</div>
        </H3>
        <div className={styles.formRow}>
          <MUISelectField
            label={<FormattedMessage {...messages.seniority} />}
            value={selectedTitle.seniority}
            className={styles.filterField}
            fullWidth
            onChange={(e, key, value) => this.updateSeniority(value)}
          >

            {seniorityOptions}
          </MUISelectField>
        </div>

        <div className={styles.formRow}>
          <div>
            <H3>
              {<FormattedMessage {...messages.editRelations} />}
            </H3>
          </div>
        </div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn className={styles.titleColumn}>
                <FormattedMessage {...messages.jobTitle} />
              </TableHeaderColumn>
              <TableHeaderColumn className={styles.proximityColumn}>
                <FormattedMessage {...messages.proximity} />
              </TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {relations.map((rel, index) =>
              <TableRow key={index}>
                <TableRowColumn className={styles.titleColumn}>
                  {rel.title}
                </TableRowColumn>
                <TableRowColumn className={styles.proximityColumn}>
                  <MUISelectField
                    value={rel.proximity}
                    className={styles.proximityField}
                    onChange={(e, key, value) => this.updateRelationProximity(value, rel.id, selectedTitle.id)}
                  >
                    {proximityOptions}
                  </MUISelectField>

                </TableRowColumn>
                <TableRowColumn className={styles.removeColumn}>
                  <Button
                    icon={<RemoveIcon />}
                    onClick={() => this.props.removeRelation(rel.id, selectedTitle.id)}
                  />
                </TableRowColumn>
              </TableRow>
            )}

          </TableBody>
        </Table>

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  titles: state => state.getIn(['titlesEditorRoot', 'filterParams', 'titles'], []),
  selectedTitle: (state) => {
    const titleId = state.getIn(['titlesEditorRoot', 'filterResults', 'selectedTitle']);
    const titles = state.getIn(['titlesEditorRoot', 'filterParams', 'titles'], []);

    return titles.find(t => t.id === titleId) || {};
  },
  relations: (state) => state.getIn(['titlesEditorRoot', 'filterParams', 'relations']),
});

function mapDispatchToProps(dispatch) {
  return {
    updateSeniority: (...args) => dispatch(updateSeniority(...args)),
    updateProximity: (...args) => dispatch(updateProximity(...args)),
    removeRelation: (...args) => dispatch(removeRelation(...args)),
  };
}

// const form = reduxForm({ form: 'SingleTitle', validate })(SingleTitle);
export default connect(mapStateToProps, mapDispatchToProps)(SingleTitle);
