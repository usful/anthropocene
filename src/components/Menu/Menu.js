import 'styles/base.scss';
import './Menu.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      menu: [
        {key: 0, name: 'Introduction'},
        {key: 1, name: 'The Digger'},
        {key: 2, name: 'Water'},
        {key: 3, name: 'Time is up'},
        {key: 4, name: 'What you can do'}
      ]
    }
  }

  static defaultProps = {
    open: false,
    onMenuChange: function() {},
    opacity: 1
  };

  menuClicked(menu) {
    this.setState({selected:menu.key});
    this.props.onMenuChange(menu);
  }

  render() {
    return (
      <menu className={`Menu ${this.props.open ? 'opened' : 'closed'}`} style={{opacity: this.props.opacity}}>
        {this.state.menu.map(menu =>
          <label key={menu.key}
                 className={this.state.selected === menu.key ? 'selected' : 'not-selected'}
                 onClick={() => this.menuClicked.call(this, menu)}>
            <div className="option" />
            <span>{menu.name}</span>
          </label>
        )}
      </menu>
    );
  }
}