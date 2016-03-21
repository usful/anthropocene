import React, {Component} from 'react';

export default class SceneComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      playing: false,
      phase1: false,
      skipped: false
    };
  }

  static defaultProps = {
    muted: false,
    onDone: function() {},
    width: window.outerWidth,
    height: window.outerHeight,
    delay: 2000,
    opacity: 1
  };

  play() {
    this.setState({playing:true});

    if (this.refs.video) this.refs.video.play();

    setTimeout(this.startPhase1.bind(this), this.props.delay/2);
  }

  stop() {
    this.setState({playing: false});

    setTimeout(function() {

    }.bind(this), this.props.delay)
  }

  startPhase1() {
    this.setState({phase1:true});
  }

  show() {
    this.setState({visible:true});
  }

  hide() {
    this.setState({visible: false});
  }

  skip() {
    this.setState({skipped: true});
  }

  render() {
    return null;
  }

  getStyle() {
    return {width: this.props.width + 'px', height: this.props.height + 'px'};
  }

  getClasses() {
    return `${this.name} Scene ${this.state.playing ? 'playing' : 'not-playing'} ${this.state.visible ? 'visible' : 'not-visible'}`;
  }
};