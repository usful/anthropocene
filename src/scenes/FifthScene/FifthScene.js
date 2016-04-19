import 'styles/base.scss';
import './FifthScene.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import SceneComponent from '../SceneComponent';
import TextRoll from '../../components/TextRoll/TextRoll';

export default class FifthScene extends SceneComponent {
  constructor(props) {
    super(props);

    this.name = 'FifthScene';
  }

  skip() {
    this.setState({playing: true, skipped: true});
    this.refs.textRoll.skip();
  }

  render() {
    return (
      <div className={this.classes} style={this.style}>
        <div className="video-wrapper" style={this.videoStyle}>
          <video ref="video" loop onCanPlay={this.fireCanPlay.bind(this)}>
            <source type="video/mp4" src="vids/clip13.mp4"/>
          </video>
        </div>

        <TextRoll ref="textRoll" visible={this.state.visible} onDone={this.props.onDone.bind(this)}>
          <span>This</span>
          <span>Project</span>
          <span>aims</span>
          <span>to</span>
          <span>collect,</span>
          <span>display</span>
          <span>and</span>
          <span>debate</span>
          <span>the</span>
          <span>evidence</span>
          <span>of</span>
          <span>human</span>
          <strong>planetary</strong>
          <span>domination.</span>
        </TextRoll>
      </div>
    )
  }
}