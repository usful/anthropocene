import 'styles/base.scss';
import './ChapterMenu.scss';

import React, {Component} from 'react';

export default class ChapterMenu extends Component {
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
    chapter: 0,
    onMenuChange: function () {
    }
  };

  menuClicked(menu) {
    this.setState({selected: menu.key});
    this.props.onMenuChange(menu);
  }

  render() {
    return (
      <div className={`ChapterMenu ${this.props.open}`}>
        <menu>
          {this.state.menu.map(menu =>
            <label key={menu.key}
                   className={menu.key <= this.props.chapter ? 'selected' : 'not-selected'}
                   onClick={() => this.menuClicked.call(this, menu)}>
              <div className="box" />
              <span>{menu.name}</span>
            </label>
          )}
        </menu>
      </div>
    );
  }
}