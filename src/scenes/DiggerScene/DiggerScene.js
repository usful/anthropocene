import 'styles/base.scss';
import './DiggerScene.scss.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import slowSpring from '../../utils/springs/slow';
import fastSpring from '../../utils/springs/fast';

import LogoInverted from '../../components/LogoInverted/LogoInverted';
import LogoContainer from '../../components/LogoContainer/LogoContainer';
import TextRoll from '../../components/TextRoll/TextRoll';

import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';

export default class DiggerScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skipped: false
    };
  }

  static defaultProps = {
    muted: false,
    onDone: function() {},
    width: window.outerWidth,
    height: window.outerHeight
  };

  startPhase1() {
    this.setState({phase1: true});

    setTimeout(this.startPhase2.bind(this), 2000);
  }

  skip() {
    this.setState({phase1: true, phase2: true, phase3: true, phase4: true, skipped: true});
    this.refs.textRoll.skip();
  }

  render() {
    return (
      <div className="DiggerScene" style={{width: this.props.width + 'px', height: this.props.height + 'px'}}>
        <Motion defaultStyle={ {opacity: 1} } style={ {opacity: spring(1, fastSpring)}}>
          {style =>
            <div className="video-wrapper" style={style}>
              <video ref={(el) => this.introVid = el} loop onCanPlay={this.startPhase1.bind(this)}
                     onTimeUpdate={this.introVidProgress.bind(this)}>
                <source type="video/mp4" src="vids/clip7.mp4"/>
              </video>
            </div>
          }
        </Motion>

        <Motion defaultStyle={{volume: 0}} style={{volume: spring(this.state.introVolume, slowSpring)}}>
          {value => <AudioPlayer src="audio/intro.mp3" play={this.state.phase2} volume={value.volume} muted={this.props.muted} /> }
        </Motion>

        <TextRoll ref="textRoll" play={this.state.phase4} onDone={this.props.onDone.bind(this)} >
          <span>We</span>
          <span>have</span>
          <span>reached</span>
          <br/>
          <span>a</span>
          <strong>historic</strong>
          <span>and</span>
          <strong>unprecedented</strong>
          <br/>
          <span>moment</span>
          <span>in human</span>
          <span>history.</span>
        </TextRoll>
      </div>
    )
  }
}