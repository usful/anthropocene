import 'styles/base.scss';
import './FourthScene.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import SceneComponent from '../SceneComponent';
import TextRoll from '../../components/TextRoll/TextRoll';

export default class FourthScene extends SceneComponent {
  constructor(props) {
    super(props);

    this.name = 'FourthScene';
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
            <source type="video/mp4" src="vids/clip3.mp4"/>
          </video>
        </div>

        <TextRoll ref="textRoll" style={{fontSize: '80%'}} visible={this.state.visible} onDone={this.props.onDone.bind(this)} >
          <span>The</span>
          <strong>Anthropocene</strong>
          <strong>Working</strong>
          <strong>Group,</strong>
          <span>a</span>
          <span>group</span>
          <span>of</span>
          <span>scientists</span>
          <span>and</span>
          <span>geologists,</span>
          <span>has</span>
          <span>proposed</span>
          <span>the</span>
          <span>title</span>
          <strong>Anthropocene</strong>
          <span>as</span>
          <span>the</span>
          <span>name</span>
          <span>of</span>
          <span>our</span>
          <span>current</span>
          <span>geological</span>
          <span>epoch,</span>
          <span>in</span>
          <span>recognition</span>
          <span>of</span>
          <span>profound</span>
          <strong>human</strong>
          <strong>impact</strong>
        </TextRoll>
      </div>
    )
  }
}