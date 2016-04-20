import 'styles/base.scss';
import './TextRoll.scss';

import React, {Component} from 'react';

export default class TextRoll extends Component {
  constructor(props) {
    super(props);

    this.key = 0;
    this.state = {
      playing: false,
      text: null,
      lines: [],
      done: false
    };
  }

  static defaultProps = {
    play: false,
    align: 'left',
    className: '',
    wait: 175,
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
    } else if (!this.state.done) {
      this.setState({done: true});
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

    this.setState({lines: this.state.lines, done: true});
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
    return `TextRoll ${this.props.className} ${this.props.align}`;
  }

  render() {
    return (
      <table className={this.className} style={this.style}>
        <tbody>
          <tr>
            <td>{this.state.lines.map(line => React.cloneElement(line.el, {key: line.id, style: {opacity: line.playing ? 1 : 0}}))}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}