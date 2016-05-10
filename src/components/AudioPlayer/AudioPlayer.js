import React from 'react';

let requestAnimationFrame = window.requestAnimationFrame || ((cb) => setTimeout(cb, 1000/30));

function easeOutCubic (currentTime, startValue, changeInValue, duration) {
  return changeInValue*((currentTime=currentTime/duration-1)*currentTime*currentTime + 1) + startValue;
}

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.playing = false;
  }

  static defaultProps = {
    muted: false,
    play: false,
    volume: 0,
    src: '',
    loop: false,
    /** time between plays if this is looped */
    delay: 0,
    /** duration to fade volume in ms */
    fadeDuration: 2000,
    onCanPlayThrough: function() {},
    onEnd: function() {}
  };

  get volume() {
    return this.refs.audio.volume * 100;
  }

  set volume(val) {
    this.refs.audio.volume = val / 100;
  }

  _moveVolume() {
    if (Math.round(this.volume) !== this.props.volume) {
      this.volume = Math.min(100, Math.max(0, easeOutCubic(Date.now() - this.startTime, this.startVolume, this.props.volume - this.startVolume, this.props.fadeDuration)));
      requestAnimationFrame(this._moveVolume.bind(this));
    }

  }

  moveVolume() {
    this.startTime = Date.now();
    this.startVolume = this.volume;
    this._moveVolume();
  }

  componentWillReceiveProps(nextProps, nextState) {

    if (nextProps.play && !this.playing) {
      this.refs.audio.play();
      this.playing = true;
    }

    if (!nextProps.play && this.playing) {
      this.refs.audio.pause();
      this.playing = false;
    }

    if (nextProps.muted) {
      this.volume = 0;
    } else if (nextProps.volume !== undefined && Math.round(this.volume) !== nextProps.volume) {
      this.moveVolume();
    }
  }

  ended(e) {
    if (this.props.loop && this.props.delay > 0) {
      setTimeout(() => this.refs.audio.play(), this.props.delay);
    }

    this.props.onEnd(e);
  }

  play() {
    this.refs.audio.play();
  }

  get readyState() {
    return this.refs.audio.readyState;
  }

  render() {
    return (
      <audio ref="audio"
             onCanPlayThrough={this.props.onCanPlayThrough.bind(this)}
             onEnded={this.ended.bind(this)}
             autoPlay={this.props.autoPlay}
             loop={this.props.loop && this.props.delay === 0}>
        <source type="audio/mp3" src={this.props.src}/>
      </audio>
    )
  }
}