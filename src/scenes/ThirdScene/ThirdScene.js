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
      <div className={this.getClasses.call(this)} style={this.getStyle.call(this)}>
        <div className="video-wrapper">
          <video ref="video" loop>
            <source type="video/mp4" src="vids/water.mp4"/>
          </video>
        </div>

        <TextRoll ref="textRoll" play={this.state.phase1 && this.state.playing} onDone={this.props.onDone.bind(this)} >
          <span>This</span>
          <span>is</span>
          <span>another</span>
          <span>meaningful</span>
          <br/>
          <strong>sentence</strong>
          <span>with</span>
          <span>impactful</span>
          <span>copy</span>
          <br/>
          <span>that is</span>
          <span>important.</span>
        </TextRoll>
      </div>
    )
  }
}