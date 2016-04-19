import React, {Component} from 'react';

export default class SceneComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      playing: false,
      phase1: false,
      skipped: false,
      canPlayFired: false
    };
  }

  static defaultProps = {
    loadingState: 0,
    muted: false,
    width: window.outerWidth,
    height: window.outerHeight,
    delay: 1250,
    opacity: 1,
    perspectiveX: 50,
    perspectiveY: 50,
    onDone: function() {},
    onCanPlay: function() {}
  };

  fireCanPlay() {
    if (!this.state.canPlayFired) {
      this.props.onCanPlay.call(this);
      this.setState({canPlayFired: true});
    }
  }

  play() {
    this.setState({playing:true});

    if (this.refs.video) this.refs.video.play();

    setTimeout(this.startPhase1.bind(this), this.props.delay/2);
  }

  stop() {
    this.setState({playing: false});
    if (this.refs.textRoll) this.refs.textRoll.reset();
  }

  startPhase1() {
    this.setState({phase1:true});
    if (this.refs.textRoll) this.refs.textRoll.play();
  }

  show() {
    this.setState({visible:true});
  }

  hide() {
    this.stop();
    this.setState({visible: false});
  }

  skip() {
    this.setState({skipped: true});
  }

  render() {
    return null;
  }

  get textShadow() {
    let compute = (val) => (val/100 * 0.5 - 0.25);

    let shadow = `${compute(this.props.perspectiveX)}em ${compute(this.props.perspectiveY)}em 0.75em rgba(0,0,0,0.66)`;
    console.log(shadow);
    return shadow;
  }

  get style() {
    return {width: this.props.width + 'px', height: this.props.height + 'px'};
  }

  get classes() {
    return `Scene ${this.name} ${this.state.playing ? 'playing' : 'not-playing'} ${this.state.visible ? 'visible' : 'not-visible'}`;
  }

  get videoOpacity() {
    return this.state.visible ? this.props.opacity : 0;
  }

  get videoStyle() {
    return {opacity: this.videoOpacity};
  }
};