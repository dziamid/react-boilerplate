import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

const Toastr = (props) => {
  const isOpen = props.activeToast !== null;
  const { message } = props.activeToast || {};
  console.log(props);
  return (
    <div>
      <Snackbar
        open={isOpen}
        message={message}
        autoHideDuration={0}
        action="undo"
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeToast: state.toastr.activeToast,
});

export default connect(mapStateToProps, null)(Toastr);
