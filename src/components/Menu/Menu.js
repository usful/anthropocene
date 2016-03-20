import 'styles/base.scss';
import './Menu.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 1,
      menu: [
        {key: 1, name: 'Introduction'},
        {key: 2, name: 'The Digger'},
        {key: 3, name: 'Water'},
        {key: 4, name: 'Time is up'},
        {key: 5, name: 'What you can do'}
      ]
    }
  }

  static defaultProps = {
    open: false,
    onMenuChange: function() {}
  };

  menuClicked(menu) {
    this.setState({selected:menu.key});
    this.props.onMenuChange(menu);
  }

  render() {
    return (
      <menu className={`Menu ${this.props.open ? 'opened' : 'closed'}`}>
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