/*
 *
 * SingleTitle
 *
 */

import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import MenuItem from 'components/MenuItem';
import H3 from 'components/H3';
import seniorities from 'mocks/seniorities';
import proximities from 'mocks/proximities';
import MUISelectField from 'material-ui/SelectField';
import { difference, compact } from 'lodash';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import Button from 'components/Button';
import { List } from 'immutable';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
}
  from 'material-ui/Table';

export default class SingleTitleEditor extends Component {

  static propTypes = {
    title: PropTypes.object,
    relations: PropTypes.oneOfType([PropTypes.instanceOf(List), PropTypes.array]),
    onSeniorityChange: PropTypes.func,
    onProximityChange: PropTypes.func,
    onRelationRemove: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleSeniorityChange = this.handleSeniorityChange.bind(this);
    this.handleProximityChange = this.handleProximityChange.bind(this);
    this.handleRelationRemove = this.handleRelationRemove.bind(this);
  }

  handleProximityChange(relation, value) {
    this.props.onProximityChange(relation, value);
  }

  handleSeniorityChange(e, key, value) {
    this.props.title.seniority = value;

    this.props.onSeniorityChange(this.props.title.id, value);
  }

  handleRelationRemove(relation) {
    this.props.onRelationRemove(relation);
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
            onChange={this.handleSeniorityChange}
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
                    onChange={(e, key, value) => this.handleProximityChange(rel, value)}
                  >
                    {proximityOptions}
                  </MUISelectField>

                </TableRowColumn>
                <TableRowColumn className={styles.removeColumn}>
                  <Button
                    icon={<RemoveIcon />}
                    onClick={() => this.handleRelationRemove(rel)}
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
