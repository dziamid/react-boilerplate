/*
 *
 * SingleTitle
 *
 */

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import * as selectors from 'containers/TitlesEditor/selectors';

import { connect } from 'react-redux';
import MenuItem from 'components/MenuItem';
import H3 from 'components/H3';
import { seniorities, proximities } from 'containers/TitlesEditor/constants';
import MUISelectField from 'material-ui/SelectField';

import { updateSeniority, updateProximity, removeRelation } from 'containers/TitlesEditor/actions';
import { difference, compact } from 'lodash';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import Button from 'components/Button';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
}
  from 'material-ui/Table';

export class SingleTitle extends Component {
  static defaultProps = {
    title: {}, // show empty form
    relations: [],
  };

  constructor(props) {
    super(props);

    // this.updateRelationProximity = this.updateRelationProximity.bind(this);
    this.updateSeniority = this.updateSeniority.bind(this);
    this.updateRelationProximity = this.updateRelationProximity.bind(this);
  }

  updateRelationProximity(...args) {
    this.props.updateProximity(...args);
  }

  updateSeniority(seniorityKey) {
    this.props.title.seniority = seniorityKey;
    this.props.updateSeniority(this.props.title.id, seniorityKey);
    this.forceUpdate();
  }

  render() {
    const {
      title,
      relations,
    } = this.props;

    const seniorityOptions = seniorities.map(s => <MenuItem key={s.value} value={s.value} primaryText={s.name} />);
    const proximityOptions = proximities.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.name} />);

    return (
      <div className={styles.SingleTitle}>
        <H3>
          <div>{title.name}</div>
        </H3>
        <div className={styles.formRow}>
          <MUISelectField
            label={<FormattedMessage {...messages.seniority} />}
            value={title.seniority}
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
                  {rel.name}
                </TableRowColumn>
                <TableRowColumn className={styles.proximityColumn}>
                  <MUISelectField
                    value={rel.proximity}
                    className={styles.proximityField}
                    onChange={(e, key, value) => this.updateRelationProximity(value, rel.id, title.id)}
                  >
                    {proximityOptions}
                  </MUISelectField>

                </TableRowColumn>
                <TableRowColumn className={styles.removeColumn}>
                  <Button
                    icon={<RemoveIcon />}
                    onClick={() => this.props.removeRelation(rel.id, title.id)}
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

function mapDispatchToProps(dispatch) {
  return {
    updateSeniority: (...args) => dispatch(updateSeniority(...args)),
    updateProximity: (...args) => dispatch(updateProximity(...args)),
    removeRelation: (...args) => dispatch(removeRelation(...args)),
  };
}

export default connect(null, mapDispatchToProps)(SingleTitle);
