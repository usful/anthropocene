import './LogoContainer.scss';

import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class LogoContainer extends Component {
  constructor(props) {
    super(props);

  }

  static defaultProps = {
    bottom: true,
    top: true,
    color: '#fff',
    inverted: false,
    width: null
  };

  get style() {
    return {
      backgroundColor: this.props.inverted ? this.props.color : 'transparent'
    };
  }

  get topStyle() {
    return {
      ... this.style,
      height: this.props.top || '10em'
    };
  }

  get bottomStyle() {
    return {
      ... this.style,
      height: this.props.bottom || '10em'
    };
  }

  get mainStyle() {
    return {
      padding: 0,
      backgroundColor: this.props.backgroundColor || 'transparent',
      width: this.props.width || 'auto',
      fill: this.props.color
    };
  }

  render() {
    return (
      <table className="LogoContainer">
        <tbody>
          <tr>
            <td style={this.topStyle}></td>
            <td style={this.topStyle}></td>
            <td style={this.topStyle}></td>
          </tr>
          <tr>
            <td style={this.style}></td>
            <td style={this.mainStyle}>{this.props.children}</td>
            <td style={this.style}></td>
          </tr>
          <tr>
            <td style={this.bottomStyle}></td>
            <td style={this.bottomStyle}></td>
            <td style={this.bottomStyle}></td>
          </tr>
        </tbody>
      </table>
    );
  }
}