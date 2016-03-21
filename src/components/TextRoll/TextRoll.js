import 'styles/base.scss';
import './TextRoll.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import fastSpring from '../../utils/springs/fast';

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
    style: {},
    visible: true,
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

  unrollLines() {
    for (let line of this.state.lines) {
      line.playing = false;
    }

    this.setState({lines: this.state.lines});
  }

  skip() {
    for (let line of this.state.lines) {
      line.playing = true;
    }

    this.setState({lines: this.state.lines});
    this.props.onDone();
  }

  play() {
    this.setState({playing: true});
    setTimeout(this.rollLine.bind(this), this.props.wait);
  }

  reset() {
    this.setState({playing: false});
    this.unrollLines();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children.length !== this.state.lines.length) {
      let count = 0;
      this.setState({lines: nextProps.children.map(child => ({id: count++, el: child, playing: false})) || []});
    }
  }

  get style() {
    return {
      ...this.props.style,
      opacity: this.props.visible ? 1 : 0
    }
  }

  get className() {
    return `TextRoll ${this.props.className}`;
  }

  render() {
    return (
      <div className={this.className} style={this.style}>
        {this.state.lines.map(line =>
          <Motion key={line.id} defaultStyle={ {opacity:0} } style={ {opacity:spring(line.playing ? 1 : 0, fastSpring)} }>
            {style => React.cloneElement(line.el, {...line.el.props, style: style})}
          </Motion>
        )}
      </div>
    )
  }
}