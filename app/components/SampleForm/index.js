import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

// import RaisedButton from 'material-ui/RaisedButton';
// import styles from './styles.css';


const SampleForm = (props) => {
  const { handleSubmit } = props;

  return (
    <div>
      <h1>Sample form with ReduxForm and MUI components</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <Field name="firstName" component="input" type="text" placeholder="First Name" />
        </div>

        <div>
          <label>Email</label>
          <Field name="email" component="input" type="email" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

SampleForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'SampleForm',
})(SampleForm);
