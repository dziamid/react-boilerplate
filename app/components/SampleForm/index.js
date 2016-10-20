import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'components/TextField';
import Button from 'components/Button';
import styles from './styles.css';

const SampleForm = (props) => {
  const { handleSubmit, reset, submitting } = props;

  return (
    <div>
      <h1>Sample form with ReduxForm and MUI components</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="field1" component={TextField} type="text" label="Label on the top" />
        </div>

        <div className={styles.actionButtons}>
          <Button type="submit" default onClick={reset} disabled={submitting}>Clear</Button>
          <Button type="submit" primary onClick={handleSubmit} disabled={submitting}>Submit</Button>
        </div>

      </form>
    </div>
  );
};

SampleForm.propTypes = {
  handleSubmit: PropTypes.func,
};


const validate = (values) => {
  const errors = {};

  if (!values.field1) {
    errors.field1 = 'Required';
  }

  if (!values.field2) {
    errors.field2 = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'SampleForm',
  validate,
})(SampleForm);
