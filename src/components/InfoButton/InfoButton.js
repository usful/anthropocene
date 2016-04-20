import './InfoButton.scss';

import React, {Component} from 'react';

export default class InfoButton extends Component {
  static defaultProps = {
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
    return <button ref="button" className={`InfoButton ${this.props.className}`} onClick={this.clicked.bind(this)} title="More Info" style={this.props.style}>
      <div className="wrapper">
        <svg className="bottom" width="100%" height="100%" viewBox="0 0 45 67">
          <rect x="1" y="1" width="43" height="65"/>
        </svg>

        <svg className="top" width="100%" height="100%" viewBox="0 0 45 67">
          <rect x="1" y="1" width="43" height="65"/>
        </svg>

        <i className={`fa fa-info-with-circle`} />
      </div>
    </button>
  }
}