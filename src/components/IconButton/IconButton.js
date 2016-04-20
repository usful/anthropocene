import './IconButton.scss';

import React, {Component} from 'react';

export default class IconButton extends Component {
  static defaultProps = {
    onClick: (e) => {},
    onMouseEnter: (e) => {},
    onMouseLeave: (e) => {},
    icon: 'times',
    iconActive: null,
    active: false,
    title: ''
  };

  constructor(props) {
    super(props);
  }

  clicked() {
    setTimeout(() => this.refs.button.blur(), 75);
    this.props.onClick();
  }

  render() {
    return <button ref="button" className={`IconButton ${this.props.className} ${this.props.active}`} onClick={this.clicked.bind(this)} title={this.props.title}>
      <div className="wrapper">
        <svg width="2.1em" height="2.1em">
          <rect x="1px" y="1px" width="2em" height="2em"/>
        </svg>

        <i className={`fa fa-${this.props.icon}`} />
        <i className={`active-icon fa fa-${this.props.iconActive}`}/>
      </div>
    </button>
  }
}