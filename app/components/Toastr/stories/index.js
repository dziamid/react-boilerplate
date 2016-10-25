import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toastrActions from 'components/Toastr/actions';

class _Container extends Component {

  componentDidMount() {
    if (this.props.showSuccess) {
      this.props.showSuccessToast('Profile is successfully updated!');
    }

    if (this.props.showError) {
      this.props.showErrorToast('Oops, there was an error');
    }

    if (this.props.showSequence) {
      this.props.showSuccessToast('First notification');
      this.props.showSuccessToast('Second notification');
      this.props.showSuccessToast('Last notification');
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

const Container = connect(
  null,
  dispatch => bindActionCreators(toastrActions, dispatch)
)(_Container);

storiesOf('Toastr', module)
  .add('success toast', () => (
    <Container showSuccess />
  ))
  .add('error toast', () => (
    <Container showError />
  ))
  .add('sequence toasts', () => (
    <Container showSequence />
  ));
