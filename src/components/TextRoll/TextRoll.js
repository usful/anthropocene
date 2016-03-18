import 'styles/base.scss';
import './TextRoll.scss';

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Motion, spring} from 'react-motion';

import fastSpring from '../../utils/springs/fast';
import dimensions from '../../utils/dimensions';

export default class TextRoll extends Component {
  constructor(props) {
    super(props);

    this.key = 0;
    this.state = {
      playing: false,
      text: null,
      lines: []
    };
  }

  static defaultProps = {
    text: 'Hello World',
    play: false,
    className: '',
    wait: 250,
    width: 200,
    units: 'px',
    onDone: function() {}
  };

  rollLine() {
    let changed = false;

    for (let line of this.state.lines) {
      if (!line.playing) {
        line.playing = true;
        changed = true;
        break;
      }
    }

    if (changed) {
      this.setState({lines: this.state.lines});
      setTimeout(this.rollLine.bind(this), this.props.wait);
    } else {
      this.props.onDone();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.play && !this.state.playing) {
      this.setState({playing: true});
      setTimeout(this.rollLine.bind(this), this.props.wait);
    }

    if (nextProps.children.length !== this.state.lines.length) {
      let count = 0;
      this.setState({lines: nextProps.children.map(child => ({id: count++, el: child, playing: false})) || []});
    }
  }

  render() {
    return (
      <div className={`TextRoll ${this.props.className}`} style={ {width: this.props.width + this.props.units} }>
        {this.state.lines.map(line =>
          <Motion key={line.id} defaultStyle={ {opacity:0} } style={ {opacity:spring(line.playing ? 1 : 0, fastSpring)} }>
            {style => React.cloneElement(line.el, {...line.el.props, style: style})}
          </Motion>
        )}
      </div>
    )
  }
}