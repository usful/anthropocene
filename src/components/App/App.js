import 'suitcss-base';
import 'styles/base.scss';
import './App.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import AudioPlayer from '../AudioPlayer/AudioPlayer';
import SideMenu from '../SideMenu/SideMenu';
import TopMenu from '../TopMenu/TopMenu';

import LoadingScene from '../../scenes/LoadingScene/LoadingScene';
import SecondScene from '../../scenes/SecondScene/SecondScene';
import ThirdScene from '../../scenes/ThirdScene/ThirdScene';
import FourthScene from '../../scenes/FourthScene/FourthScene';
import FifthScene from '../../scenes/FifthScene/FifthScene';
import SixthScene from '../../scenes/SixthScene/SixthScene';

let isResizing; //timeout reference to track if the user is currently resizing the window.

const HEART_BEAT_DECREASE = 250; //ms
const OPACITY_DECREASE = 0.15; //of 100%
const OPACITY_CUTOFF = 0.30; //the point at which to trigger the sharing page.
const SCENES = ['loadingScene', 'secondScene', 'thirdScene', 'fourthScene', 'fifthScene', 'sixthScene'];
const HEART_BEAT_START = 1000; //ms

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingState: 0,
      width: window.outerWidth,
      height: window.outerHeight,
      shareMode: false,
      muted: false,
      siteOpacity: 1,
      loaded: false,
      beat: HEART_BEAT_START,
      lastMenu: 0
    };

    window.addEventListener('resize', this.windowResized.bind(this));
  }

  windowResized() {
    if (isResizing) {
      clearTimeout(isResizing);
    }

    isResizing = setTimeout(() => this.setState({width: window.outerWidth, height: window.outerHeight}), 250);
  }

  loadingSceneDone() {
    setTimeout(() => {
      this.setState({loaded: true});
    }, this.state.beat);
  }

  theHeartBeats() {
    if (this.state.siteOpacity < OPACITY_CUTOFF) {
      this.setState({beat: HEART_BEAT_START*10, siteOpacity: 0});
      this.refs[SCENES[this.state.lastMenu]].hide();
      setTimeout(() => this.setState({shareMode: true}), 2000);
    } else {
      this.setState({beat: this.state.beat + HEART_BEAT_DECREASE, siteOpacity: this.state.siteOpacity - OPACITY_DECREASE});
    }
  }

  mouseMove(e) {
    let x = Math.floor(e.clientX / this.state.width * 100);
    let y = Math.floor(e.clientY / this.state.height * 100);

    this.setState({perspectiveOrigin: `${x/2}% ${0-(y/2)}%`});
  }

  menuChanged(menu) {
    this.setState({beat: HEART_BEAT_START, siteOpacity: 1});
    this.refs.heartbeat.play();

    this.refs[SCENES[this.state.lastMenu]].hide();
    this.refs[SCENES[this.state.lastMenu]].stop();

    this.refs[SCENES[menu.key]].show();
    this.refs[SCENES[menu.key]].play();

    this.setState({lastMenu: menu.key});


  }

  skipIntro() {
    this.refs.loadingScene.skip();
  }
  
  toggleMute() {
    this.setState({muted: !this.state.muted});
  }

  beSocial() {
    this.setState({beat: HEART_BEAT_START, siteOpacity: 1});
    this.refs.heartbeat.play();
  }

  increaseLoadingState() {
    this.setState({loadingState: this.state.loadingState+1});
  }

  resuscitate() {
    this.setState({beat: HEART_BEAT_START, siteOpacity: 1, shareMode: false});
    this.refs.heartbeat.play();
    this.refs[SCENES[this.state.lastMenu]].show();
    this.refs[SCENES[this.state.lastMenu]].play();
  }

  render() {
    return (
      <div className={`App ${this.state.shareMode ? 'share-mode' : 'story-mode'}`} >
        <section className="support">
          <div className="wrapper">
            <h2>Raise awareness for the Anthropocene.</h2>
            <h1>Share this story.</h1>

            <label onClick={this.resuscitate.bind(this)}>I want to keep watching.</label>
          </div>
        </section>

        <section className="main" style={{perspectiveOrigin: this.state.perspectiveOrigin}} onMouseMove={this.mouseMove.bind(this)}>
          <LoadingScene ref="loadingScene"
                        onCanPlay={this.increaseLoadingState.bind(this)}
                        onDone={this.loadingSceneDone.bind(this)}
                        muted={this.state.muted}
                        width={this.state.width}
                        height={this.state.height}
                        opacity={this.state.siteOpacity}
                        loadingState={this.state.loadingState}
          />

          <SecondScene ref="secondScene"  width={this.state.width} height={this.state.height} opacity={this.state.siteOpacity} onCanPlay={this.increaseLoadingState.bind(this)}/>
          <ThirdScene ref="thirdScene" width={this.state.width} height={this.state.height} opacity={this.state.siteOpacity} onCanPlay={this.increaseLoadingState.bind(this)}/>
          <FourthScene ref="fourthScene" width={this.state.width} height={this.state.height} opacity={this.state.siteOpacity} onCanPlay={this.increaseLoadingState.bind(this)}/>
          <FifthScene ref="fifthScene" width={this.state.width} height={this.state.height} opacity={this.state.siteOpacity} onCanPlay={this.increaseLoadingState.bind(this)}/>
          <SixthScene ref="sixthScene" width={this.state.width} height={this.state.height} opacity={this.state.siteOpacity} onCanPlay={this.increaseLoadingState.bind(this)}/>

          <SideMenu open={this.state.loaded} onMenuChange={this.menuChanged.bind(this)} opacity={this.state.siteOpacity}/>
          <TopMenu open={this.state.loaded}/>

          <menu className={`controls ${this.state.loaded ? 'light' : 'dark'}`}>
            <i className={`fa fa-fast-forward ${this.state.loaded}`} title="Skip Intro" onClick={this.skipIntro.bind(this)}/>
            <i className={`fa fa-volume-up ${this.state.muted}`} title="Sound off" onClick={this.toggleMute.bind(this)} />
            <i className={`fa fa-volume-off ${this.state.muted}`} title="Sound on" onClick={this.toggleMute.bind(this)} />
          </menu>

          <menu className={`social ${this.state.loaded ? 'light' : 'dark'}`}>
            <i className="fa fa-facebook-official" title="Facebook" onClick={this.beSocial.bind(this)} />
            <i className="fa fa-twitter" title="Twitter" onClick={this.beSocial.bind(this)} />
          </menu>

        </section>
        <AudioPlayer src="audio/background.mp3" play={this.state.loaded} loop={true} volume={this.state.shareMode ? 0 : 50} muted={this.state.muted}/>
        <AudioPlayer src="audio/heartbeat.mp3" play={this.state.loaded} loop={true} onEnd={this.theHeartBeats.bind(this)} delay={this.state.beat} volume={25} muted={this.state.muted}/>
        <AudioPlayer ref="heartbeat" src="audio/heartbeat.mp3" volume={100} muted={this.state.muted}/>
      </div>
    )
  }
}

