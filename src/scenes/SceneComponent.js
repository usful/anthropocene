import React, {Component} from 'react';

export default class SceneComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: false,
      visible: false,
      playing: false,
      phase1: false,
      skipped: false,
      canPlayFired: false,
      showInfo: false
    };
  }

  static defaultProps = {
    loadingState: 0,
    muted: false,
    width: window.outerWidth,
    height: window.outerHeight,
    perspectiveX: 50,
    perspectiveY: 50,
    delay: 1250,
    opacity: 1,
    onDone: function() {},
    onNext: function() {},
    onCanPlay: function() {},
    onCloseRightPanel: function() {},
    onToggleRightPanel: function() {}
  };

  fireCanPlay() {
    if (!this.state.canPlayFired) {
      this.props.onCanPlay.call(this);
      this.setState({canPlayFired: true});
    }
  }

  toggleInfo() {
    this.setState({showInfo: true});
    this.props.onToggleRightPanel();
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
    setTimeout(() => this.setState({shown:true}), 10);
  }

  hide() {
    this.stop();
    this.setState({shown: false});
    setTimeout(() => this.setState({visible:false}), 1000);
  }

  skip() {
    this.setState({skipped: true});
  }

  render() {
    return null;
  }

  get textShadow() {
    let offset = (val) => (val/100-0.15);

    return `${offset(this.props.perspectiveX)}em ${offset(this.props.perspectiveY)}em 2em rgba(0,0,0,1)`;
  }

  get style() {
    return {width: `${this.props.width}px`, height: `${this.props.height}px`};
  }

  get classes() {
    return `Scene ${this.name} ${this.state.playing ? 'playing' : 'not-playing'} ${this.state.shown ? 'shown' : 'not-shown'} ${this.state.visible ? 'visible' : 'not-visible'}`;
  }

  get videoOpacity() {
    return (this.state.shown && this.state.visible) ? this.props.opacity : 0;
  }

  get videoStyle() {
    return {opacity: this.videoOpacity};
  }
};