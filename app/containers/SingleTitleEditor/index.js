/*
 *
 * SingleTitle
 *
 */

import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import MenuItem from 'components/MenuItem';
import H3 from 'components/H3';
import H2 from 'components/H2';
import { seniorities, proximities } from './constants';
import MUISelectField from 'material-ui/SelectField';

import { updateTitle } from 'containers/FilterParams/actions';

export class SingleTitle extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.updateRelationProximity = this.updateRelationProximity.bind(this);
    this.updateSeniority = this.updateSeniority.bind(this);
  }

  updateRelationProximity(rel, proximityKey) {
    // this.selectedTitle.relations = this.selectedTitle.relations || [];
    // rel.proximity = proximityKey;
    // this.selectedTitle.relations.push(rel);
    // this.props.updateTitle(this.selectedTitle._id, this.selectedTitle);
  }

  updateSeniority(seniorityKey) {
    this.selectedTitle.seniority = seniorityKey;
    this.props.updateTitle(this.selectedTitle._id, this.selectedTitle);
    this.forceUpdate();
  }

  render() {
    const { selectedTitle, relations } = this.props;

    const seniorityOptions = seniorities.map(s => <MenuItem key={s.value} value={s.value} primaryText={s.name} />);
    const proximityOptions = proximities.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.name} />);

    this.selectedTitle = selectedTitle;

    const mockRel = [{ title: 'related title #1', proximity: 3 }, { title: 'related title #2', proximity: 4 }];

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

          {(relations || []).map((rel, index) => {
            return (
              <div className={styles.tableRow} key={index}>
                  <span className={styles.jobTitleCol}>
                    {rel.title}
                  </span>
                <span className={styles.proximityCol}>
                    <MUISelectField
                      value={rel.proximity}
                      className={styles.proximityField}
                      style={{ minWidth: 150 }}
                      onChange={(e, key, value) => this.updateRelationProximity(rel, key)}
                    >
                      {proximityOptions}
                    </MUISelectField>
                  </span>
                <span className={styles.buttonCol}>
                    <a href>X</a>
                  </span>
              </div>

            );
          })}
        </div>
      </div>
    );
  }
}

SingleTitle.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  dispatch: PropTypes.func,
  form: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedTitle: (state) => {
    const titleId = state.getIn(['titlesEditorRoot', 'filterResults', 'selectedTitle']);
    const titles = state.getIn(['titlesEditorRoot', 'filterParams', 'titles']);
    const selected = titles ? titles.filter(t => t._id === titleId) : null;
    return Array.isArray(selected) && selected[0] ? selected[0] : {};
  },
  relations: (state) => {
    const titleId = state.getIn(['titlesEditorRoot', 'filterResults', 'selectedTitle']);
    const titles = state.getIn(['titlesEditorRoot', 'filterParams', 'titles']);
    const selected = titles ? titles.filter(t => t._id === titleId) : null;
    return Array.isArray(selected) && selected[0] ? selected[0].relations : [];
  },
});

function mapDispatchToProps(dispatch) {
  return {
    updateTitle: (id, title) => dispatch(updateTitle(id, title)),
  };
}

const validate = (values) => {
  const errors = {};

  if (!values.get('field1')) {
    errors.field1 = 'Required';
  }

  return errors;
};

// const form = reduxForm({ form: 'SingleTitle', validate })(SingleTitle);
export default connect(mapStateToProps, mapDispatchToProps)(SingleTitle);
