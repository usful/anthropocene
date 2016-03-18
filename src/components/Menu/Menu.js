import 'styles/base.scss';
import './Menu.scss';

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Motion, spring} from 'react-motion';

import fastSpring from '../../utils/springs/fast';
import dimensions from '../../utils/dimensions';

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {open: false, width: 20, buffer: 5};

  render() {
    return (
      <Motion defaultStyle={ {left: 0} } style={{left: spring(this.props.open ? -this.props.buffer : -this.props.width-this.props.buffer, fastSpring) }} >
        {style => <div className="Menu" style={{left: style.left + 'vw', width: this.props.width + 'vw', marginLeft: this.props.buffer + 'vw'}}>
          <label>Menu 1</label>
          <label>Menu 2</label>
          <label>Menu 3</label>
          <label>Menu 4</label>
        </div>}
      </Motion>
    )
  }
}