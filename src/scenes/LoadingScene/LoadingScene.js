import 'styles/base.scss';
import './LoadingScene.scss';

import React, {Component} from 'react';

import SceneComponent from '../SceneComponent';

import LogoInverted from '../../components/LogoInverted/LogoInverted';
import LogoContainer from '../../components/LogoContainer/LogoContainer';
import TextRoll from '../../components/TextRoll/TextRoll';
import LargeButton from '../../components/LargeButton/LargeButton';
import InfoSection from '../../components/InfoSection/InfoSection';
import InfoButton from '../../components/InfoButton/InfoButton';

import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';

const TOTAL_SCENES = 5; // total amount of scenes, for loading purposes.
const INTRO_TIMING = 3; // seconds

export default class LoadingScene extends SceneComponent {
  constructor(props) {
    super(props);

    this.name = 'LoadingScene';

    this.state = {
      ... this.state,
      playing: true,
      shown: true,
      visible: true,
      hasPlayed: false,
      phase2: false,
      phase3: false,
      phase4: false,
      introVolume: 0
    };
  }

  fireCanPlay(e) {
    if (!this.state.canPlayFired && this.refs.video.readyState >= 2 && this.refs.introAudio.readyState >= 2) {
      this.props.onCanPlayThrough.call(this, e);
      this.setState({canPlayFired: true});
      this.startPhase1();
    }
  }

  startPhase1() {
    if (this.state.hasPlayed) return this.skip();

    window.location.hash = '#chapter-0';
    this.setState({phase1: true, introVolume: 0});

    setTimeout(this.startPhase2.bind(this), this.props.delay);
  }

  startPhase2() {
    this.refs.video.play();

    if (!this.state.phase2) {
      this.setState({phase2: true, introVolume: 100});
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
    this.setState({phase5: true, introVolume: 0, hasPlayed: true});
    //setTimeout(() => this.showInfo(), this.props.delay);
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
        <div className="video-wrapper" style={this.videoStyle} onClick={this.props.onCloseRightPanel}>
          <video ref="video" loop onCanPlayThrough={this.fireCanPlay.bind(this)} onTimeUpdate={this.introVidProgress.bind(this)}>
            <source type="video/mp4" src="vids/empty-lake.mp4"/>
          </video>
        </div>

        <AudioPlayer ref="introAudio" src="audio/intro.mp3" play={this.state.phase2} fadeDuration={5000} onCanPlayThrough={this.fireCanPlay.bind(this)} volume={this.state.introVolume} muted={this.props.muted} />

        <div className="underlay" style={{opacity: this.state.phase2 ? 0 : 1, display: this.state.phase3 ? 'none' : 'block'}}></div>

        <div className="overlay inverted intro-text" style={{opacity: this.state.phase3 ? 0 : 1, display: this.state.phase4 ? 'none' : 'block'}}>
          <LogoContainer inverted={true} color='#fff' top='30vh' bottom='60vh' width="18em">
            <LogoInverted/>
          </LogoContainer>
        </div>

        <TextRoll ref="textRoll" style={{textShadow: this.textShadow, fontSize: '125%'}} align={"left"} visible={this.state.visible} onDone={() => {this.startPhase5(); this.props.onDone.call(this);}} >
          <span>We</span>
          <span>have</span>
          <span>reached</span>
          <span>an</span>
          <strong>unprecedented</strong>
          <span>moment</span>
          <span>in</span>
          <span>planetary</span>
          <span>history.</span>
          <br/>
          <InfoButton onClick={this.toggleInfo.bind(this)}/>
          <LargeButton onClick={this.props.onNext} />
        </TextRoll>


        <InfoSection visible={this.state.showInfo} onClose={this.toggleInfo.bind(this)}>
          <h1>Lake, Chile</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec velit placerat
            risus malesuada euismod vitae at felis. Vestibulum ut scelerisque elit. Maecenas non
            laoreet leo.  Maecenas elementum tortor odio, a elementum sem hendrerit sit amet.
          </p>
          <footer>Source: <a href="#">http://www.theanthropocence.org</a></footer>
        </InfoSection>

        <div className="loading">
          <div className="loading-bar" style={this.loadingBarStyle}></div>
        </div>
      </div>
    )
  }
}