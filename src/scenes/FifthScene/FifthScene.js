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
          <span>More</span>
          <span>text</span>
          <span>that</span>
          <span>is</span>
          <br/>
          <strong>super</strong>
          <span>impactful</span>
          <span>and</span>
          <span>very</span>
          <br/>
          <span>short</span>
          <span>and sweet.</span>
        </TextRoll>
      </div>
    )
  }
}