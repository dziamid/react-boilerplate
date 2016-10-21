import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.css';

function Tostr() {
  return (
    <ReduxToastr timeOut={2000} newestOnTop={false} position="top-center" />
  );
}

export default Tostr;
