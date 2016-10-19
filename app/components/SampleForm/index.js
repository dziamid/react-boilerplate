import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';

// import RaisedButton from 'material-ui/RaisedButton';
// import styles from './styles.css';

const Input = ({ input, label, meta: { touched, error }, ...custom }) => (
  <div>
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  </div>
);

const SampleForm = (props) => {
  const { handleSubmit } = props;

  return (
    <div>
      <h1>Sample form with ReduxForm and MUI components</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <Field name="firstName" component={Input} type="text" />
        </div>

        <div>
          <label>Email</label>
          <Field name="email" component={Input} type="text" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

SampleForm.propTypes = {
  handleSubmit: PropTypes.func,
};


const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default reduxForm({
  form: 'SampleForm',
  validate,
})(SampleForm);
