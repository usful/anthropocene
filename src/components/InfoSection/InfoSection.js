import './InfoSection.scss';

import React, {Component} from 'react';

import IconButton from '../IconButton/IconButton';

export default class InfoSection extends Component {
  static defaultProps = {
    visible: false,
    onClose: (e) => {}
  };

  constructor(props) {
    super(props);
  }

  get className() {
    return `InfoSection ${this.props.visible ? 'visible' : 'not-visible'}`;
  }

  render() {
    return (
      <div className={this.className}>
        <IconButton icon="times" onClick={this.props.onClose.bind(this)}/>
        {this.props.children}
      </div>
    );
  }
}