import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class VideoFrame extends Component {
  constructor(props) {
    super(props);

    this.playing = false;
  }

  static defaultProps = {
    playing: false,
    src: '',
    onCanPlay: function() {}
  };

  componentWillUpdate(nextProps, nextState) {
  }

  render() {
    return (
      <audio ref="audio" onCanPlay={this.props.onCanPlay.bind(this)} autoPlay={this.props.autoPlay} loop={this.props.loop}>
        <source type="audio/mp3" src={this.props.src}/>
      </audio>
    )
  }
}