/**
 * A link to a certain page, an anchor tag
 */

import * as React from 'react';
import {omit} from 'lodash';
const styles = require('./styles.css');

export interface IAProps extends React.ClassAttributes<A> {
  children?: React.ReactNode,
  //children are optional due to TS does not understand react children syntax
  //todo: wait until resolved https://github.com/Microsoft/TypeScript/issues/8588
  className?: string,
  href: string,
  target?: string,
}

class A extends React.Component<IAProps, {}> {
  public render() {
    const {className, children, href, target} = this.props;
    const other = omit(this.props, ['className', 'children', 'href', 'target']);

    return (
      <a
        href={href}
        target={target}
        className={className || styles.link}
        {...other}
      >
        { children }
      </a>
    );
  }
}

export default A;
