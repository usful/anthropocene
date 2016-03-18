import 'suitcss-base';
import 'styles/base.scss';
import './App.scss';

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Motion, spring} from 'react-motion';

import slowSpring from '../../utils/springs/slow';
import fastSpring from '../../utils/springs/fast';
import dimensions from '../../utils/dimensions';

import WordMark from '../WordMark/WordMark';
import Logo from '../Logo/Logo';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import Menu from '../Menu/Menu';
import TextRoll from '../TextRoll/TextRoll';

import LoadingScene from '../../scenes/LoadingScene/LoadingScene';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.outerWidth,
      height: window.outerHeight,
      menuOpen: false,
      isLoadingSceneDone: false,
      introVolume: 0
    };
  }

  loadingSceneDone() {
    this.setState({isLoadingSceneDone: true});
  }

  textRoll1Done() {
    this.setState({menuOpen: true})
  }
  render() {
    return (
      <div className="App" style={{width: dimensions.width + 'px', height: dimensions.height + 'px'}}>
        <LoadingScene onDone={this.loadingSceneDone.bind(this)} />
        <Menu open={this.state.menuOpen}/>

        <menu className={`top-nav ${this.state.menuOpen ? "visible" : "hidden"}`}>
          <a href="#">Anthropocene Defined</a>
          <a href="#">The Project</a>
          <a href="#">Team</a>
          <a href="#">Partners</a>
          <a href="#">The Hub</a>
        </menu>

        <TextRoll play={this.state.isLoadingSceneDone} width={40} units="em" onDone={this.textRoll1Done.bind(this)} >
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

        <AudioPlayer src="audio/background.mp3" play={this.state.phase1} loop={true} volume={75}/>
      </div>
    )
  }
}

