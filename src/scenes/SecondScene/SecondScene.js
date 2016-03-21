import 'styles/base.scss';
import './SecondScene.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import SceneComponent from '../SceneComponent';
import TextRoll from '../../components/TextRoll/TextRoll';

export default class SecondScene extends SceneComponent {
  constructor(props) {
    super(props);

    this.name = 'SecondScene';
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
            <source type="video/mp4" src="vids/clip7.mp4"/>
          </video>
        </div>

        <TextRoll ref="textRoll" visible={this.state.visible} onDone={this.props.onDone.bind(this)} >
          <span>As a</span>
          <strong>civilization,</strong>
          <span>humanity</span>
          <br/>
          <span>has</span>
          <span>spent its</span>
          <strong>entire history</strong>
          <span>carving</span>
          <br/>
          <span>an existence</span>
          <span>out of</span>
          <span>the planet.</span>
        </TextRoll>
      </div>
    )
  }
}