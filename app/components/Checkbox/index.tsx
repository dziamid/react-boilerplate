import * as React from 'react';
import {default as MUICheckbox} from 'material-ui/Checkbox';
import {omit} from 'lodash';

interface ICheckboxProps {
  input: {
    onChange: (value: boolean) => void,
    value: boolean,
  },
  meta?: any,
  [key: string]: any,
}

class Checkbox extends React.Component<ICheckboxProps, {}> {
  static defaultProps = {
    input: {},
  };

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event: React.MouseEvent<{}>, value: boolean) {
    this.props.input.onChange(value);
  }

  render() {
    const {
      input: {onChange, value},
      meta,
      label,
    } = this.props;

    const proxyProps = omit(this.props, ['input', 'meta']);
    const inputProps = omit(this.props.input, ['onChange', 'value']);

    return (
      <MUICheckbox
        labelPosition={label ? 'left' : undefined}
        checked={Boolean(value)}
        onCheck={this.handleChange}
        {...inputProps}
        {...proxyProps}
      />
    );
  }

}

export default Checkbox;
