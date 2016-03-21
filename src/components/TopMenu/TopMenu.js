import 'styles/base.scss';
import './TopMenu.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import Logo from '../Logo/Logo';

const OPACITY_BASE = 1;
const OPACITY_HOVER = 1;

export default class TopMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      opacity: 0,
      hovering: false
    }
  }

  static defaultProps = {
    open: false,
    opacity: 1,
    onMenuChange: function () {
    }
  };

  menuClicked(menu) {
    this.setState({selected: menu.key});
    this.props.onMenuChange(menu);
  }

  mouseEnter() {
    this.setState({hovering: true, opacity: this.props.open ? OPACITY_HOVER : 0});
  }

  mouseLeave() {
    this.setState({hovering: false, opacity: this.props.open ? OPACITY_BASE : 0});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.state.open) {
      //Menu opening
      this.setState({opacity:OPACITY_BASE});
    } else if (!nextProps.open && this.state.open) {
      //Menu closing
      this.setState({opacity: 0});
    }
  }

  render() {
    return (
      <menu className={`TopMenu ${this.props.open}`}
            onMouseEnter={this.mouseEnter.bind(this)}
            onMouseOut={this.mouseLeave.bind(this)}
            style={{opacity: this.state.opacity * this.props.opacity}}>
        <a href="#" className="logo"><Logo/></a>
        <a href="http://theanthropocene.org/anthropocene/">Anthropocene Defined</a>
        <a href="http://theanthropocene.org/the-project/">The Project</a>
        <a href="http://theanthropocene.org/about/">Team</a>
        <a href="http://theanthropocene.org/partners/">Partners</a>
        <a href="http://theanthropocene.org/blog/">The Hub</a>
      </menu>
    );
  }
}