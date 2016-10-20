import React from 'react';
import { default as MUIDialog } from 'material-ui/Dialog';
import styles from './styles.css';

function Dialog(props) {
  return (
    <MUIDialog
      actionsContainerClassName={styles.actions}
      {...props}
    />
  );
}

export default Dialog;
