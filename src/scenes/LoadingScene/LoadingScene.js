import 'styles/base.scss';
import './LoadingScene.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import slowSpring from '../../utils/springs/slow';
import fastSpring from '../../utils/springs/fast';

import SceneComponent from '../SceneComponent';

import LogoInverted from '../../components/LogoInverted/LogoInverted';
import LogoContainer from '../../components/LogoContainer/LogoContainer';
import TextRoll from '../../components/TextRoll/TextRoll';

import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';

const TOTAL_SCENES = 5; // total amount of scenes, for loading purposes.
const INTRO_TIMING = 2; // seconds

export default class LoadingScene extends SceneComponent {
  constructor(props) {
    super(props);

    this.name = 'LoadingScene';

    this.state = {
      ... this.state,
      playing: true,
      visible: true,
      phase2: false,
      phase3: false,
      phase4: false,
      introVolume: 0
    };
  }

  fireCanPlay(e) {
    if (!this.state.canPlayFired && this.refs.video.readyState >= 2 && this.introAudio.readyState >= 2) {
      this.props.onCanPlay.call(this, e);
      this.setState({canPlayFired: true});
      this.startPhase1();
    }
  }

  startPhase1() {
    this.setState({phase1: true, introVolume: 100});

    setTimeout(this.startPhase2.bind(this), this.props.delay);
  }

  startPhase2() {
    this.refs.video.play();

    if (!this.state.phase2) {
      this.setState({phase2: true});
      setTimeout(this.startPhase3.bind(this), this.props.delay);
    }
  }

  startPhase3() {
    this.setState({phase3: true});
  }

  startPhase4() {
    this.setState({phase4: true});
  }

  startPhase5() {
    this.setState({phase5: true, introVolume: 0});
  }

  introVidProgress(e) {
    if (e.target.currentTime > INTRO_TIMING && !this.state.phase4) {
      this.refs.textRoll.play();
      this.startPhase4();
    }
  }

  skip() {
    this.setState({phase1: true, phase2: true, phase3: true, phase4: true, skipped: true, introVolume: 0});
    this.refs.textRoll.skip();
  }

  get loadingBarStyle() {
    return {width: Math.ceil((this.props.loadingState / TOTAL_SCENES) * 100) + '%', opacity: this.props.loadingState >= TOTAL_SCENES ? 0 : 1};
  }

  render() {
    return (
      <div className={this.classes} style={this.style}>
        <div className="video-wrapper" style={this.videoStyle}>
          <video ref="video" loop onCanPlay={this.fireCanPlay.bind(this)} onTimeUpdate={this.introVidProgress.bind(this)}>
            <source type="video/mp4" src="vids/empty-lake.mp4"/>
          </video>
        </div>

        <Motion defaultStyle={{volume: 0}} style={{volume: spring(this.state.introVolume, slowSpring)}}>
          {value => <AudioPlayer ref={(el) => this.introAudio = el} src="audio/intro.mp3" play={this.state.phase1} onCanPlay={this.fireCanPlay.bind(this)} volume={value.volume} muted={this.props.muted} /> }
        </Motion>

        <div className="underlay" style={{opacity: this.state.phase2 ? 0 : 1, display: this.state.phase3 ? 'none' : 'block'}}></div>

        <div className="overlay inverted intro-text" style={{opacity: this.state.phase3 ? 0 : 1, display: this.state.phase4 ? 'none' : 'block'}}>
          <LogoContainer inverted={true} color='#fff' top='30vh' bottom='60vh' width="18em">
            <LogoInverted/>
          </LogoContainer>
        </div>

        <TextRoll ref="textRoll" style={{textShadow: this.textShadow, fontSize: '125%'}} align={"right"} visible={this.state.visible} onDone={() => {this.startPhase5(); this.props.onDone.call(this);}} >
          <span>We</span>
          <span>have</span>
          <span>reached</span>
          <span>an</span>
          <strong>unprecedented</strong>
          <span>moment</span>
          <span>in</span>
          <span>planetary</span>
          <span>history.</span>
        </TextRoll>

        <div className="loading">
          <div className="loading-bar" style={this.loadingBarStyle}></div>
        </div>
      </div>
    )
  }
}