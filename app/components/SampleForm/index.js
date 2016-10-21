import React, { PropTypes, Component } from 'react';
import { Field, reduxForm, change, SubmissionError } from 'redux-form';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Dialog from 'components/Dialog';
import styles from './styles.css';

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

  submit() {
    return sleep(500)
      .then(() => {
        this.closeConfirmDialog();

        throw new SubmissionError({ field1: 'Server validation failed' });
      });
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
        <form >
          <div>
            <Field name="field1" component={TextField} type="text" label="Label on the top" />
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
              name="field3"
              component={Checkbox}
              label="Checkbox with label on the right"
              labelPosition="right"
            />
          </div>

          <div className={styles.actionButtons}>
            <Button raised default onClick={reset} disabled={submitting}>Clear</Button>
            <Button
              type="submit"
              raised primary
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


const validate = (values) => {
  const errors = {};

  if (!values.field1) {
    errors.field1 = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'SampleForm',
  validate,
})(SampleForm);
