import 'suitcss-base';
import 'styles/base.scss';
import './App.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import Logo from '../Logo/Logo';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import Menu from '../Menu/Menu';

import LoadingScene from '../../scenes/LoadingScene/LoadingScene';

let isResizing;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.outerWidth,
      height: window.outerHeight,
      muted: false,
      siteOpacity: 1,
      loaded: false,
      beat: 1000
    };

    window.addEventListener('resize', this.windowResized.bind(this));
  }

  windowResized() {
    if (isResizing) {
      clearTimeout(isResizing);
    }

    isResizing = setTimeout(function() {
      this.setState({width: window.outerWidth, height: window.outerHeight});
    }.bind(this), 250);
  }

  loadingSceneDone() {
    setTimeout(() => {
      this.setState({loaded: true});
      this.theHeartBeats();
    },1);
  }

  theHeartBeats() {
    this.setState({beat: this.state.beat + 250, siteOpacity: this.state.siteOpacity - 0.01});

    setTimeout(this.theHeartBeats.bind(this), this.state.beat);
  }

  mouseMove(e) {
    let x = Math.floor(e.clientX / this.state.width * 100);
    let y = Math.floor(e.clientY / this.state.height * 100);

    this.setState({perspectiveOrigin: `${x/2}% ${0-(y/2)}%`});
  }

  menuChanged(e) {
    this.setState({beat: 1000, siteOpacity: 1});
    this.refs.heartbeat.play();
  }

  skipIntro() {
    this.refs.loadingScene.skip();
  }
  
  toggleMute() {
    this.setState({muted: !this.state.muted});
  }

  render() {
    return (
      <div className="App" >
        <section className="support">
          <h1>Support our cause.</h1>
        </section>

        <section className="main" style={{opacity: this.state.siteOpacity, perspectiveOrigin: this.state.perspectiveOrigin}} onMouseMove={this.mouseMove.bind(this)}>
          <LoadingScene ref="loadingScene" onDone={this.loadingSceneDone.bind(this)} muted={this.state.muted} width={this.state.width} height={this.state.height}/>

          <Menu open={this.state.loaded} onMenuChange={this.menuChanged.bind(this)}/>

          <menu className={`top-nav ${this.state.loaded ? "visible" : "hidden"}`}>
            <a href="#" className="logo"><Logo/></a>
            <a href="#">Anthropocene Defined</a>
            <a href="#">The Project</a>
            <a href="#">Team</a>
            <a href="#">Partners</a>
            <a href="#">The Hub</a>
          </menu>

          <menu className={`controls ${this.state.loaded ? 'light' : 'dark'}`}>
            <i className={`fa fa-fast-forward ${this.state.loaded}`} title="Skip Intro" onClick={this.skipIntro.bind(this)}/>
            <i className={`fa fa-volume-up ${this.state.muted}`} title="Sound off" onClick={this.toggleMute.bind(this)} />
            <i className={`fa fa-volume-off ${this.state.muted}`} title="Sound on" onClick={this.toggleMute.bind(this)} />
          </menu>
        </section>
        <AudioPlayer src="audio/background.mp3" play={this.state.loaded} loop={true} volume={50} muted={this.state.muted}/>
        <AudioPlayer src="audio/heartbeat.mp3" play={this.state.loaded} loop={true} delay={this.state.beat} volume={25} muted={this.state.muted}/>
        <AudioPlayer ref="heartbeat" src="audio/heartbeat.mp3" volume={100} muted={this.state.muted}/>
      </div>
    )
  }
}

