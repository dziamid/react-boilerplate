import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import TextField from 'components/TextField';
import Button from 'components/Button';
import styles from './styles.css';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';
import AddIcon from 'material-ui/svg-icons/content/add-circle';

export const renderUsers = (props) => {
  const {
    fields,
    meta,  // eslint-disable-line no-unused-vars
  } = props;

  return (
    <div>
      {fields.map((user, index) =>
        <div className={styles.user} key={index}>
          <Field
            name={`${user}.email`}
            type="email"
            component={TextField}
            label="Email Address"
            className={styles.email}
          />
          <Field
            name={`${user}.name`}
            label="Name"
            component={TextField}
            className={styles.name}
          />
          <div>
            <Button
              icon={<RemoveIcon />}
              onClick={() => fields.remove(index)}
            />
          </div>
        </div>
      )}

      <Button
        icon={<AddIcon />}
        label="Add User"
        onClick={() => fields.push({})}
      />
    </div>
  );
};

class UsersForm extends Component {

  render() {
    return (
      <div>
        <h1>Users management</h1>
        <FieldArray name="users" component={renderUsers} />
      </div>
    );
  }

}

UsersForm.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  dispatch: PropTypes.func,
  form: PropTypes.string,
};


const validate = () => ({});

const form = reduxForm({ form: 'UsersForm', validate })(UsersForm);
export default connect(
  () => ({
    initialValues: {
      users: [
        { email: 'sample@user.com', name: 'Sample User' },
      ],
    },
  }),
  null)(form);
