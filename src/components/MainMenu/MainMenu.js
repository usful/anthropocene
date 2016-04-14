import 'styles/base.scss';
import './MainMenu.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import Logo from '../Logo/Logo';

const OPACITY_BASE = 1;
const OPACITY_HOVER = 1;

export default class MainMenu extends Component {
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
    onMenuChange: (e) => false,
    onCloseMenu: (e) => false
  };

  menuClicked(menu) {
    this.setState({selected: menu.key});
    this.props.onMenuChange(menu);
  }

  render() {
    return (
      <menu className={`MainMenu ${this.props.open ? 'open' : 'closed'}`} onCloseMenu={this.props.onCloseMenu}>
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