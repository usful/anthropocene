import 'styles/base.scss';
import './ThirdScene.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import SceneComponent from '../SceneComponent';
import TextRoll from '../../components/TextRoll/TextRoll';

export default class ThirdScene extends SceneComponent {
  constructor(props) {
    super(props);

    this.name = 'ThirdScene';
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
            <source type="video/mp4" src="vids/water.mp4"/>
          </video>
        </div>

        <TextRoll ref="textRoll" style={{fontSize: '75%'}} visible={this.state.visible} onDone={this.props.onDone.bind(this)} >
          <span>Climate</span>
          <span>change,</span>
          <span>extinctions,</span>
          <span>invasive</span>
          <span>species</span>
          <span>technofossils</span>
          <span>anthroturbation</span>
          <span>terraforming</span>
          <span>of</span>
          <span>land</span>
          <span>and</span>
          <span>redirection</span>
          <span>of</span>
          <span>water</span>
          <span>are</span>
          <span>all</span>
          <span>part</span>
          <span>of</span>
          <span>the</span>
          <span>indelible</span>
          <span>human</span>
          <span>signature.</span>
        </TextRoll>
      </div>
    )
  }
}