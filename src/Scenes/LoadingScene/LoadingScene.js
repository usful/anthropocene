import 'styles/base.scss';
import './LoadingScene.scss';

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Motion, spring} from 'react-motion';

import slowSpring from '../../utils/springs/slow';
import fastSpring from '../../utils/springs/fast';
import dimensions from '../../utils/dimensions';

import WordMark from '../../components/WordMark/WordMark';
import WordMarkInverted from '../../components/WordMarkInverted/WordMarkInverted';
import Logo from '../../components/Logo/Logo';
import LogoInverted from '../../components/LogoInverted/LogoInverted';
import LogoContainer from '../../components/LogoContainer/LogoContainer';

import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';

export default class LoadingScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phase1: false,
      phase2: false,
      phase3: false,
      phase4: false,
      introVolume: 0
    };
  }

  static defaultProps = {
    onDone: function() {}
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
      this.props.onDone(this);
      this.startPhase4();
    }
  }

  render() {
    return (
      <div className="LoadingScene" style={{width: dimensions.width + 'px', height: dimensions.height + 'px'}}>
        <Motion defaultStyle={ {opacity: 1} } style={ {opacity: spring((this.state.introVidActive) ? 1 : 1, fastSpring)}}>
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
          {value => <AudioPlayer src="audio/intro.mp3" play={this.state.phase2} volume={value.volume}/> }
        </Motion>

        <Motion defaultStyle={{opacity: 1}} style={{opacity: spring(this.state.phase2 ? 0 : 1, slowSpring)}}>
          {style => <div className="underlay"
                         style={{opacity: style.opacity, display: this.state.phase3 ? 'none' : 'block'}}></div> }
        </Motion>

        <Motion defaultStyle={{opacity: 1}} style={{opacity: spring(!this.state.phase3 ? 1 : 0, slowSpring)}}>
          {style => <div className="overlay inverted intro-text"
                         style={{opacity: style.opacity, display: this.state.phase4 ? 'none' : 'block'}}>
            <LogoContainer inverted={true} color='#fff' top='20vh' bottom='60vh' width="20em">
              <LogoInverted/>
            </LogoContainer>
          </div>}
        </Motion>
      </div>
    )
  }
}