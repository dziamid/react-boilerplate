import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as toastrActions } from 'react-redux-toastr';
import Button from 'components/Button';

class Container extends Component {
  constructor(props) {
    super(props);
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
  }

  showSuccessMessage() {
    this.props.success('Title', 'You are all set up!');
  }

  showErrorMessage() {
    this.props.error('Title', 'You are all set up!');
  }

  render() {
    return (
      <div>
        <Button raised primary onClick={() => this.showSuccessMessage()}>Success</Button>
        <Button raised secondary onClick={() => this.showErrorMessage()}>Failure</Button>
      </div>
    );
  }
}

const ContainerWithActions = connect(
  null,
  dispatch => bindActionCreators(toastrActions, dispatch)
)(Container);

storiesOf('Toastr', module)
  .add('success toast', () => (
    <ContainerWithActions />
  ));
