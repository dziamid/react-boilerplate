import * as React from 'react';
import { default as MUICheckbox } from 'material-ui/Checkbox';

interface ICheckboxProps {
  input: any,
  meta?: any,
  [key: string]: any,
}

class Checkbox extends React.Component<ICheckboxProps, {}> {
  render() {
    const {
        input: { onChange, value, ...inputProps },
        meta,
        ...other,
      } = this.props;

      const { label } = other;

      return (
        <MUICheckbox
          labelPosition={label ? 'left' : undefined}
          checked={Boolean(value)}
          onCheck={onChange}
          {...inputProps}
          {...other}
        />
      );
  }

}

export default Checkbox;
