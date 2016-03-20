import React, {Component} from 'react';

export default class Logo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg className="Logo" version="1.2" viewBox="0 0 350 340" style={this.props.style}>
        <g>
          <path d="M70.8,251.7C65.2,262,58.9,272.1,52,281.8c-5.9,8.5-12.9,17.6-21,27.3c-8.1,9.8-16.9,18.4-26.5,26.1h70.8
            h70.4c-0.6-0.2-1.1-0.5-1.6-0.7C102.9,329.3,71,294.3,70.8,251.7"/>
          <polygon points="183.4,4.3 145.7,90.4 266.1,331.7 345.8,331.7 	"/>
        </g>
      </svg>
    )
  }
}