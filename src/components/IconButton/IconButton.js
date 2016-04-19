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

  render() {
    return <button className={`IconButton ${this.props.className} ${this.props.active}`} onClick={this.props.onClick} title={this.props.title}>
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