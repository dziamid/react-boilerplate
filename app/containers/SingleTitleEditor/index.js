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

import { updateTitle } from 'containers/FilterParams/actions';
import { difference } from 'lodash';

export class SingleTitle extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    // this.updateRelationProximity = this.updateRelationProximity.bind(this);
    this.updateSeniority = this.updateSeniority.bind(this);
    this.getRelations = this.getRelations.bind(this);
  }

  // updateRelationProximity(rel, proximityKey) {
  //   this.selectedTitle.relations = this.selectedTitle.relations || [];
  //   rel.proximity = proximityKey;
  //   this.selectedTitle.relations.push(rel);
  //   this.props.updateTitle(this.selectedTitle._id, this.selectedTitle);
  // }

  updateSeniority(seniorityKey) {
    this.selectedTitle.seniority = seniorityKey;
    this.props.updateTitle(this.selectedTitle._id, this.selectedTitle);
    this.forceUpdate();
  }

  getRelations(title) {
    const relations = this.props.relations.filter(r => r.indexOf(title._id) !== -1); // todo: use selector
    const relatedIds = relations.map(r => difference(r, [title._id])[0]);

    return relatedIds.map(id => this.props.titles.find(t => t._id === id));
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
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <span className={styles.jobTitleCol}>
              <FormattedMessage {...messages.jobTitle} />
            </span>
            <span className={styles.proximityCol}>
              <FormattedMessage {...messages.proximity} />
            </span>
            <span className={styles.buttonCol}>
              {/* <FormattedMessage {...messages.delete} />*/}
            </span>
          </div>

          {relations.map((rel, index) => (
            <div className={styles.tableRow} key={index}>
              <span className={styles.jobTitleCol}>
                {rel.title}
              </span>
              <span className={styles.proximityCol}>
                <MUISelectField
                  value={rel.proximity}
                  className={styles.proximityField}
                  style={{ minWidth: 150 }}
                >
                  {proximityOptions}
                </MUISelectField>
              </span>
              <span className={styles.buttonCol}>
                <a href>X</a>
              </span>
            </div>

          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  titles: state => state.getIn(['titlesEditorRoot', 'filterParams', 'titles'], []),
  selectedTitle: (state) => {
    const titleId = state.getIn(['titlesEditorRoot', 'filterResults', 'selectedTitle']);
    const titles = state.getIn(['titlesEditorRoot', 'filterParams', 'titles'], []);

    return titles.find(t => t._id === titleId) || {};
  },
  relations: (state) => state.getIn(['titlesEditorRoot', 'filterParams', 'relations']),
});

function mapDispatchToProps(dispatch) {
  return {
    updateTitle: (id, title) => dispatch(updateTitle(id, title)),
  };
}

// const form = reduxForm({ form: 'SingleTitle', validate })(SingleTitle);
export default connect(mapStateToProps, mapDispatchToProps)(SingleTitle);
