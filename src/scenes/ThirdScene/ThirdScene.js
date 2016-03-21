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

        <TextRoll ref="textRoll" visible={this.state.visible} onDone={this.props.onDone.bind(this)} >
          <span>Climate change,</span>
          <strong>extinctions,</strong>
          <br/>
          <span>food shortages,</span>
          <span>and</span>
          <strong>diseases</strong>
          <br/>
          <span>have all</span>
          <span>been linked</span>
          <span>to</span>
          <br/>
          <strong>human</strong>
          <span>activity.</span>
        </TextRoll>
      </div>
    )
  }
}