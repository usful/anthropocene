import 'styles/base.scss';
import './LoadingScene.scss';

import React, {Component} from 'react';
import bowser from 'bowser';

import SceneComponent from '../SceneComponent';

import LogoInverted from '../../components/LogoInverted/LogoInverted';
import LogoContainer from '../../components/LogoContainer/LogoContainer';
import TextRoll from '../../components/TextRoll/TextRoll';
import LargeButton from '../../components/LargeButton/LargeButton';
import InfoSection from '../../components/InfoSection/InfoSection';
import InfoButton from '../../components/InfoButton/InfoButton';

import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';

const TOTAL_SCENES = 5; // total amount of scenes, for loading purposes.
const INTRO_TIMING = 5; // seconds

export default class LoadingScene extends SceneComponent {
  constructor(props) {
    super(props);

    this.name = 'LoadingScene';

    this.state = {
      ... this.state,
      playing: false,
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

    if ((bowser.mobile || bowser.tablet) || (!this.state.canPlayFired && this.refs.video.readyState >= 2 && this.refs.introAudio.readyState >= 2)) {
      this.props.onCanPlayThrough.call(this, e);
      this.setState({canPlayFired: true});
    }
  }

  startPhase1() {
    if (this.state.hasPlayed) return this.skip();

    this.setState({phase1: true, introVolume: 0});

    setTimeout(this.startPhase2.bind(this), this.props.delay);
  }

  startPhase2() {
    if (!this.state.phase2) {
      this.refs.video.play();
      this.setState({phase2: true, introVolume: 100});
      setTimeout(this.startPhase3.bind(this), this.props.delay);
    }
  }

  startPhase3() {
    this.setState({phase3: true});

    if (bowser.mobile || bowser.tablet) {
      this.refs.textRoll.play();
      this.startPhase4();
    }
  }

  startPhase4() {
    this.setState({phase4: true});
  }

  startPhase5() {
    this.setState({phase5: true, introVolume: 0, hasPlayed: true});
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
          <img src="vids/empty-lake.jpg" onLoad={this.posterLoaded.bind(this)}/>
          <video ref="video" loop onCanPlayThrough={this.fireCanPlay.bind(this)} onTimeUpdate={this.introVidProgress.bind(this)}>
            <source type="video/mp4" src="vids/empty-lake.mp4"/>
          </video>
        </div>

        <AudioPlayer ref="introAudio" src="audio/intro.mp3" play={this.state.phase2} fadeDuration={5000} onCanPlayThrough={this.fireCanPlay.bind(this)} volume={this.state.introVolume} muted={this.props.muted} />
        <div className="underlay" style={{opacity: this.state.phase2 ? 0 : 1, visibility: (!this.state.visible || this.state.phase3) ? 'hidden' : 'visible'}}></div>

        <div className="overlay inverted intro-text" style={{opacity: this.state.phase3 ? 0 : 1, visibility: (!this.state.visible || this.state.phase4) ? 'hidden' : 'visible'}}>
          <LogoContainer inverted={true} color='#fff' top='30vh' bottom='60vh' width="18em">
            <LogoInverted/>
          </LogoContainer>
        </div>

        <TextRoll ref="textRoll" style={{fontSize: '125%'}} align="left" visible={this.state.visible} onDone={() => {this.startPhase5(); this.props.onDone.call(this);}} >
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
          <InfoButton onClick={e => this.toggleInfo()}/>
          <LargeButton onClick={this.props.onNext} />
        </TextRoll>


        <InfoSection visible={this.state.showInfo} onClose={e => this.toggleInfo()}>
          <h1>Colorado River Delta, Mexico</h1>
          <p>
            The Colorado River is 2330 kilometres long and was basically responsible for shaping the Grand Canyon.
            It has 15 major dams, which redirect water to Las Vegas, the Imperial Valley, Arizona and Southern
            California; 40 million people depend on it. Because so much is taken, the river has only reached the
            ocean a few times since the 1960’s and the delta, pictured here, has mostly been dry.
          </p>
          <p>
            The Colorado River Delta presents an example of human redirection of water, and its repercussions.
          </p>

          <footer>Source: Courtesy of <a href="http://www.watchwatermarkmovie.com/">Watermark</a>, 2013.</footer>
          <footer>Reference: <a href="http://www.smithsonianmag.com/science-nature/the-colorado-river-runs-dry-61427169/">Smithsonian Magazine</a>.</footer>
        </InfoSection>

        <div className="loading">
          <div className="loading-bar" style={this.loadingBarStyle}></div>
        </div>
      </div>
    )
  }
}