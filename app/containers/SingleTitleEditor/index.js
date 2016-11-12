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

import { connect } from 'react-redux';
import { Field, reduxForm, change, SubmissionError } from 'redux-form/immutable';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import MenuItem from 'components/MenuItem';
import H3 from 'components/H3';
import H2 from 'components/H2';
import { seniorities, proximities, titleName } from './mocks';

export class SingleTitle extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit, reset, submitting, dispatch, form } = this.props;

    const seniorityOptions = seniorities.map(s => <MenuItem key={s.value} value={s.name} primaryText={s.name} />);
    const proximityOptions = proximities.map(p => <MenuItem key={p.value} value={p.name} primaryText={p.name} />);

    return (
      <div className={styles.SingleTitle}>
        <H2>
          <div>{titleName}</div>
        </H2>
        <div className={styles.formRow}>
          <Field
            name="seniority"
            component={SelectField}
            label={<FormattedMessage {...messages.seniority} />}
            value={5}
            className={styles.filterField}
          >
            {seniorityOptions}
          </Field>
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

            {[1, 2, 3, 4, 5].map(i => {
              return (
                <div className={styles.tableRow}>
                  <span className={styles.jobTitleCol}>
                    title
                    -{i}
                  </span>
                  <span className={styles.proximityCol}>
                    <Field
                      name="proximity"
                      component={SelectField}
                      value={5}
                      className={styles.proximityField}
                    >
                      {proximityOptions}
                    </Field>
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

const mapStateToProps = () => {
  return {};
}; // selectSingleTitle();

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

const form = reduxForm({ form: 'SingleTitle', validate })(SingleTitle);
export default connect(mapStateToProps, mapDispatchToProps)(form);
