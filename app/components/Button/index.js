import React, { PropTypes, Children } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import InlineSVG from 'svg-inline-react';

import styles from './styles.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import close from './images/close.svg';
const icons = {
  close,
};

function Button({ className, icon, label, raised, children, onClick, ...rest }) {
  const isIconOnlyButton = icon && label === undefined;
  const isLabelledButton = label !== undefined || children !== undefined;
  const ButtonComponent = raised ? RaisedButton : FlatButton;

  return (
    <div className={cx(styles.root, className)}>

      { isIconOnlyButton ?
        <IconButton onClick={onClick}>
          <InlineSVG src={icons[icon]} />
        </IconButton>
        : null
      }

      { isLabelledButton ?
        <ButtonComponent onClick={onClick} label={label} {...rest}>
          {Children.toArray(children)}
        </ButtonComponent>
        : null
      }

    </div>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  icon: PropTypes.string,
  label: PropTypes.string,
};

export default Button;
