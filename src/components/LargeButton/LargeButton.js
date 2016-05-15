import './LargeButton.scss';

import React, {Component} from 'react';
import fontWidth from '../../utils/fontWidth';

export default class LargeButton extends Component {
  static defaultProps = {
    className: '',
    text: 'Next',
    icon: 'angle-right',
    width: 10,
    height: 4.5,
    onClick: (e) => {},
    style: {}
  };

  constructor(props) {
    super(props);
  }

  clicked() {
    setTimeout(() => this.refs.button.blur(), 75);
    this.props.onClick();
  }

  render() {
    return <button ref="button" className={`LargeButton ${this.props.className}`} onClick={this.clicked.bind(this)} title={this.props.text} style={{... this.props.style, width: fontWidth(this.props.width), height: fontWidth(this.props.height) }}>
      <div className="wrapper" style={{width: fontWidth(this.props.width), height: fontWidth(this.props.height) }}>
        <svg className="bottom" width="100%" height="100%" viewBox={`0 0 ${fontWidth(this.props.width)} ${fontWidth(this.props.height)}`}>
          <rect x="1" y="1" width={fontWidth(this.props.width)-2} height={fontWidth(this.props.height)-2}/>
        </svg>

        <svg className="top" width="100%" height="100%" viewBox={`0 0 ${fontWidth(this.props.width)} ${fontWidth(this.props.height)}`}>
          <rect x="1" y="1" width={fontWidth(this.props.width)-2} height={fontWidth(this.props.height)-2}/>
        </svg>

        <label>{this.props.text}</label>
        <i className={`fa fa-${this.props.icon}`} />
      </div>
    </button>
  }
}