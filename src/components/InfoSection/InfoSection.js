import './InfoSection.scss';

import React, {Component} from 'react';

import IconButton from '../IconButton/IconButton';

export default class InfoSection extends Component {
  static defaultProps = {
    visible: false
  };

  constructor(props) {
    super(props);

    this.state = {
      shown: false,
      showContent: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && !this.props.visible) {
      setTimeout(() => this.setState({shown:true}), 1);
    }
  }

  get className() {
    return `InfoSection ${this.props.visible ? 'visible' : 'not-visible'} ${this.state.shown ? 'shown' : 'not-shown'}`;
  }

  get contentClassName() {
    return `content ${this.state.showContent ? 'shown' : 'not-shown'}`;
  }

  toggleContent() {
    this.setState({showContent: !this.state.showContent});
  }

  render() {
    return (
      <div className={this.className}>
        <IconButton icon="info-with-circle" onClick={this.toggleContent.bind(this)}/>
        <div className={this.contentClassName}>
          {this.props.children}
        </div>
      </div>
    );
  }
}