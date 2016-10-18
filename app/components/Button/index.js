import React, { PropTypes, Children } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './styles.css';

function Button({ className, children, onClick, ...props }) {
  return (
    <div className={styles.buttonWrapper}>
      <RaisedButton className={className || styles.button} onClick={onClick} {...props}>
        {Children.toArray(children)}
      </RaisedButton>
    </div>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
