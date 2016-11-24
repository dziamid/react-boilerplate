import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, change, SubmissionError } from 'redux-form/immutable';

import TextField from 'components/TextField';
import Autocomplete from 'components/Autocomplete';
import AddressAutocomplete from 'components/AddressAutocomplete';
import ChipInput from 'components/ChipInput';
import { renderUsers } from 'components/UsersForm';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Dialog from 'components/Dialog';
import styles from './styles.css';
import * as toastrActions from 'components/Toastr/actions';
import countries from 'components/common/stories/countries';

const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

class SampleForm extends Component {
  constructor() {
    super();

    this.state = {
      showConfirmDialog: false,
      submittingValues: {},
    };
    this.closeConfirmDialog = this.closeConfirmDialog.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);
    this.submit = this.submit.bind(this);
  }

  closeConfirmDialog() {
    this.setState({ showConfirmDialog: false });
  }

  confirmSubmit(submittingValues) {
    this.setState({
      showConfirmDialog: true,
      submittingValues,
    });
  }

  async submit() {
    await sleep(500); // simulate server latency
    this.closeConfirmDialog();
    if (this.props.triggerValidationError) {
      throw new SubmissionError({ field1: 'Server validation failed' });
    }
    await sleep(200); // make room for modal close animation
    this.props.showSuccessToast('Congrats, data has been saved!');
  }

  render() {
    const { handleSubmit, reset, submitting, dispatch, form } = this.props;
    const dialogActions = [
      <Button label="Cancel" onClick={this.closeConfirmDialog} />,
      <Button label="Submit" primary onClick={handleSubmit(this.submit)} />,
    ];

    const dialog = (
      <Dialog
        title="Are you sure?"
        actions={dialogActions}
        modal
        open={this.state.showConfirmDialog}
        autoScrollBodyContent
      >
        <p>You are about to submit the following data to server:</p>
        <pre>
          {JSON.stringify(this.state.submittingValues, null, 4)}
        </pre>
      </Dialog>
    );

    return (
      <div>
        { dialog }

        <h1>Sample form with ReduxForm and MUI components</h1>
        <form style={{ width: '100%' }}>
          <div>
            <Field
              name="field1"
              component={TextField}
              type="text"
              label="Label on the top"
            />
          </div>

          <div>
            <Field
              name="field2"
              component={TextField}
              type="text"
              withClear
              onClear={() => dispatch(change(form, 'field2', ''))}
              label="With clear button"
            />
          </div>
          <div>
            <Field
              name="country"
              component={Autocomplete}
              dataSource={countries.map(c => ({ text: c.name, value: c.code }))}
              label="Choose country (Autocomplete)"
              withClear
              noFreetext
              valueMapper={item => item.value}
              onClear={() => dispatch(change(form, 'country', ''))}
            />
          </div>
          <div>
            <Field
              name="field5"
              component={Checkbox}
              label="Checkbox with label on the right"
              labelPosition="right"
            />
          </div>
          <div>
            <Field
              name="countries"
              label="Choose countries"
              component={ChipInput}
              dataSource={countries.map(c => c.name)}
              noFreetext
            />
          </div>
          <div>
            <Field
              name="address"
              label="Enter Address"
              component={AddressAutocomplete}
              withClear
              onClear={() => dispatch(change(form, 'address', ''))}
            />
          </div>
          <div>
            <h2>Embedded users form</h2>
            <FieldArray name="users" component={renderUsers} />
          </div>

          <div className={styles.actionButtons}>
            <Button raised default onClick={reset} disabled={submitting}>Clear</Button>
            <Button
              type="submit"
              raised
              primary
              disabled={submitting}
              onClick={handleSubmit(this.confirmSubmit)}
            >
              Submit
            </Button>
          </div>

        </form>
      </div>
    );
  }

}

SampleForm.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  dispatch: PropTypes.func,
  form: PropTypes.string,
};

const required = (value) => {
  return !value ? 'Required' : null;
};

const email = (value) => {
  const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return !emailRegexp.test(value) ? 'Invalid email address' : null;
};

const uniqueEmail = (list) => (value) => {
  return list.filter(i => i.get('email') === value).size > 1 ? 'Email address must be unique' : null;
};

const all = (value, ...validators) => {
  for (const v of validators) {
    const result = v(value);
    if (result !== null) {
      return result;
    }
  }

  return null;
};

const validate = (values) => {
  const errors = {};

  if (!values.get('field1')) {
    errors.field1 = 'Required';
  }

  const users = values.get('users');

  if (users.size < 1) {
    errors.users = { _error: 'At least one user is required' };
  }

  errors.users = users.map(u => ({
    email: all(u.get('email'), required, email, uniqueEmail(users)),
    name: required(u.get('name')),
  })).toJS();

  return errors;
};

const form = reduxForm({ form: 'SampleForm', validate })(SampleForm);
export default connect(
  () => ({
    initialValues: {
      countries: [],
      users: [
        { email: 'sample@user.com', name: 'Sample User' },
      ],
    },
  }),
  dispatch => bindActionCreators(toastrActions, dispatch))(form);
