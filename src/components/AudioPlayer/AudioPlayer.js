import React, {Component} from 'react';
import ReactDom from 'react-dom';


export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.playing = false;
  }

  static defaultProps = {
    play: false,
    volume: 1,
    src: '',
    onCanPlay: function() {}
  };

  componentWillUpdate(nextProps, nextState) {

    if (nextProps.play && !this.playing) {
      this.refs.audio.play();
      this.playing = true;
    }

    if (!nextProps.play && this.playing) {
      this.refs.audio.pause();
      this.playing = false;
    }

    this.refs.audio.volume = nextProps.volume / 100;
  }

  render() {
    return (
      <audio ref="audio" onCanPlay={this.props.onCanPlay.bind(this)} autoPlay={this.props.autoPlay} loop={this.props.loop}>
        <source type="audio/mp3" src={this.props.src}/>
      </audio>
    )
  }
}