import './InfoSection.scss';

import React, {Component} from 'react';

import IconButton from '../IconButton/IconButton';

export default class InfoSection extends Component {
  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="wrapper">
        <IconButton icon="info-circle-btl" />
        <div class="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}