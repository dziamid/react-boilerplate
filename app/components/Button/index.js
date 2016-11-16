import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

function Button({ icon, label, raised, children, ...other }) {
  const hasLabel = label !== undefined || children !== undefined;
  const hasIcon = icon !== undefined;

  const iconOnly = !hasLabel && hasIcon;

  const ButtonComponent = iconOnly ? IconButton : (raised ? RaisedButton : FlatButton);
  const props = {
    label,
    icon: iconOnly ? undefined : icon,
    children: iconOnly ? icon : children,
    ...other,
  };

  return (
    <ButtonComponent {...props} />
  );
}

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.object,
  label: PropTypes.string,
};

export default Button;
