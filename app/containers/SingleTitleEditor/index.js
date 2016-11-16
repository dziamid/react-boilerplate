/*
 *
 * SingleTitle
 *
 */

import React, { PropTypes, Component } from 'react';
// import selectSingleTitle from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
// import { Field, reduxForm, change, SubmissionError } from 'redux-form/immutable';
// import SelectField from 'components/SelectField';
import MenuItem from 'components/MenuItem';
import H3 from 'components/H3';
import H2 from 'components/H2';
import { seniorities, proximities, titleName } from './mocks';
import MUISelectField from 'material-ui/SelectField';


export class SingleTitle extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {selectedTitle} = this.props;

    const seniorityOptions = seniorities.map(s => <MenuItem key={s.value} value={s.name} primaryText={s.name}/>);
    const proximityOptions = proximities.map(p => <MenuItem key={p.value} value={p.name} primaryText={p.name}/>);

    return (
      <div className={styles.SingleTitle}>
        <H2>
          <div>{selectedTitle.title}</div>
        </H2>
        <div className={styles.formRow}>
          <MUISelectField
            label={<FormattedMessage {...messages.seniority} />}
            value={selectedTitle.seniority}
            className={styles.filterField}
            onChange={(e, key, value) => {console.log(e, key, value); selectedTitle.seniority = value}}
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

          {(selectedTitle.relations || [1, 2]).map(i => {
            return (
              <div className={styles.tableRow}>
                  <span className={styles.jobTitleCol}>
                    title
                    -{i}
                  </span>
                <span className={styles.proximityCol}>
                    <MUISelectField
                      value={i.proximity}
                      className={styles.proximityField}
                      onChange={(e, key, value) => console.log(e, key, value)}
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
    const selected = titles.filter(t => t._id === titleId);
    return Array.isArray(selected) && selected[0] ? selected[0] : {};
  }
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
