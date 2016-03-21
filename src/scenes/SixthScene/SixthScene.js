import 'styles/base.scss';
import './SixthScene.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import SceneComponent from '../SceneComponent';
import TextRoll from '../../components/TextRoll/TextRoll';

export default class SixthScene extends SceneComponent {
  constructor(props) {
    super(props);

    this.name = 'SixthScene';
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
            <source type="video/mp4" src="vids/clip11.mp4"/>
          </video>
        </div>

        <TextRoll ref="textRoll" visible={this.state.visible} onDone={this.props.onDone.bind(this)}>
          <span>This project</span>
          <br/>
          <span>is to</span>
          <span>draw</span>
          <span>attention,</span>
          <br/>
          <strong>viscerally</strong>
          <span>and</span>
          <strong>undeniably,</strong>
          <br/>
          <span>to</span>
          <span>our impact.</span>
        </TextRoll>
      </div>
    )
  }
}