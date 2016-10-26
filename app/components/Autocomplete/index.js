import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '!style!css!sass!./styles.scss';
import cx from 'classnames';

export default class Autocomplete extends Component {
  render() {
    return (
      <div className="MaterialSelector">
        <Select
          {...this.props}
          onChange={this.onChange}
          value={this.props.value}
          placeholder=""
          options={this.props.options}
        />
        <div className={cx('bar', { errorState: this.props.errorText })} />
        <label className={cx({ errorState: this.props.errorText })}>
          {this.props.label}
        </label>
        <div className="errorText">{this.props.errorText}</div>
      </div>
    );
  }
}
