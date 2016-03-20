import 'styles/base.scss';
import './LoadingScene.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import slowSpring from '../../utils/springs/slow';
import fastSpring from '../../utils/springs/fast';

import LogoInverted from '../../components/LogoInverted/LogoInverted';
import LogoContainer from '../../components/LogoContainer/LogoContainer';
import TextRoll from '../../components/TextRoll/TextRoll';

import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';

export default class LoadingScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phase1: false,
      phase2: false,
      phase3: false,
      phase4: false,
      skipped: false,
      introVolume: 0
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

  startPhase2() {
    this.setState({phase2: true, introVolume: 100});
    this.introVid.play();
    setTimeout(this.startPhase3.bind(this), 5000);
  }

  startPhase3() {
    this.setState({phase3: true});
  }

  startPhase4() {
    this.setState({phase4: true, introVolume: 0});
  }

  introVidProgress(e) {
    if (e.target.currentTime > 13 && !this.state.phase4) {
      this.startPhase4();
    }
  }

  skip() {
    this.setState({phase1: true, phase2: true, phase3: true, phase4: true, skipped: true});
    this.refs.textRoll.skip();
  }

  render() {
    return (
      <div className="LoadingScene" style={{width: this.props.width + 'px', height: this.props.height + 'px'}}>
        <Motion defaultStyle={ {opacity: 1} } style={ {opacity: spring(1, fastSpring)}}>
          {style =>
            <div className="video-wrapper" style={style}>
              <video ref={(el) => this.introVid = el} loop onCanPlay={this.startPhase1.bind(this)}
                     onTimeUpdate={this.introVidProgress.bind(this)}>
                <source type="video/mp4" src="vids/empty-lake.mp4"/>
              </video>
            </div>
          }
        </Motion>

        <Motion defaultStyle={{volume: 0}} style={{volume: spring(this.state.introVolume, slowSpring)}}>
          {value => <AudioPlayer src="audio/intro.mp3" play={this.state.phase2} volume={value.volume} muted={this.props.muted} /> }
        </Motion>

        <Motion defaultStyle={{opacity: 1}} style={{opacity: spring(this.state.phase2 ? 0 : 1, slowSpring)}}>
          {style => <div className="underlay"
                         style={{opacity: style.opacity, display: this.state.phase3 ? 'none' : 'block'}}></div> }
        </Motion>

        <Motion defaultStyle={{opacity: 1}} style={{opacity: spring(!this.state.phase3 ? 1 : 0, slowSpring)}}>
          {style => <div className="overlay inverted intro-text"
                         style={{opacity: style.opacity, display: this.state.phase4 ? 'none' : 'block'}}>
            <LogoContainer inverted={true} color='#fff' top='30vh' bottom='60vh' width="19em">
              <LogoInverted/>
            </LogoContainer>
          </div>}
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