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

  getStyle() {
    return {
      backgroundColor: this.props.inverted ? this.props.color : 'transparent'
    }
  }

  getTopStyle() {
    return Object.assign(this.getStyle(), {
      height: this.props.top || '10em'
    });
  }

  getBottomStyle() {
    return Object.assign(this.getStyle(), {
      height: this.props.bottom || '10em'
    });
  }

  render() {
    return (
      <table className="LogoContainer">
        <tbody>
          <tr>
            <td style={this.getTopStyle()}></td>
            <td style={this.getTopStyle()}></td>
            <td style={this.getTopStyle()}></td>
          </tr>
          <tr>
            <td style={this.getStyle()}></td>
            <td style={{backgroundColor: this.props.backgroundColor || 'transparent', width: this.props.width || 'auto', fill: this.props.color}}>{this.props.children}</td>
            <td style={this.getStyle()}></td>
          </tr>
          <tr>
            <td style={this.getBottomStyle()}></td>
            <td style={this.getBottomStyle()}></td>
            <td style={this.getBottomStyle()}></td>
          </tr>
        </tbody>
      </table>
    )
  }
}