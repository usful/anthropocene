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

        <TextRoll ref="textRoll" visible={this.state.visible} onDone={this.props.onDone.bind(this)} >
          <br/>
          <strong>Anthropocene</strong>
          <span>reflects</span>
          <span>the</span>
          <br/>
          <strong>mass</strong>
          <span>and</span>
          <span>irreversible</span>
          <span>impact</span>
          <br/>
          <span>humans have</span>
          <span>wrought</span>
          <span>on the</span>
          <br/>
          <span>planet.</span>
        </TextRoll>
      </div>
    )
  }
}