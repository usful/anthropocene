import 'styles/base.scss';
import './SideMenu.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

const OPACITY_BASE = 1;
const OPACITY_HOVER = 1;

export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      opacity: 0,
      hovering: false,
      menu: [
        {key: 0, name: 'Introduction'},
        {key: 1, name: 'Our Existence'},
        {key: 2, name: 'The Human Signature'},
        {key: 3, name: 'Anthropocene'},
        {key: 4, name: 'The Project'}
      ]
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
      <menu className={`SideMenu ${this.props.open}`}
            style={{opacity: this.state.opacity * this.props.opacity}}>
        {this.state.menu.map(menu =>
          <label key={menu.key}
                 className={this.state.selected === menu.key ? 'selected' : 'not-selected'}
                 onClick={() => this.menuClicked.call(this, menu)}>
            <div className="option"/>
            <span>{menu.name}</span>
          </label>
        )}
      </menu>
    );
  }
}