import 'suitcss-base';
import 'styles/base.scss';
import './App.scss';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

require('./object-assign.js');

import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import ChapterMenu from '../components/ChapterMenu/ChapterMenu';
import MainMenu from '../components/MainMenu/MainMenu';
import IconButton from '../components/IconButton/IconButton';

import LoadingScene from '../scenes/LoadingScene/LoadingScene';
import SecondScene from '../scenes/SecondScene/SecondScene';
import ThirdScene from '../scenes/ThirdScene/ThirdScene';
import FourthScene from '../scenes/FourthScene/FourthScene';
import FifthScene from '../scenes/FifthScene/FifthScene';

let isResizing; //timeout reference to track if the user is currently resizing the window.

const HEART_BEAT_DECREASE = 250; //ms
const OPACITY_DECREASE = 0.15; //of 100%
const OPACITY_CUTOFF = 0.30; //the point at which to trigger the sharing page.
const SCENES = ['loadingScene', 'secondScene', 'thirdScene', 'fourthScene', 'fifthScene', 'sixthScene'];
const HEART_BEAT_START = 1000; //ms

const DEFAULT_STATE = {
  siteOpacity: 1,
  loaded: false,
  muted: false,
  shareMode: false,
  beat: HEART_BEAT_START,
  lastChapter: 0,
  firstTime: true,
  menuOpen: false
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ... this.savedState,
      loadingState: 0,
      perspectiveX: 50,
      perspectiveY: 50,
      width: window.outerWidth,
      height: window.outerHeight
    };

    window.location.hash = '';

    window.addEventListener('resize', this.windowResized.bind(this));
    window.addEventListener('hashchange', this.hashChanged.bind(this));
  }

  componentWillUpdate(nextProps, nextState) {
    //Save the state;
    this.savedState = nextState;
  }

  get savedState() {
    let state = {};

    try {
      //state = JSON.parse(localStorage.getItem('savedState'));
    } catch (e) {
      console.error(e);
    }

    return {
      ... DEFAULT_STATE,
      ... state
    };
  }

  set savedState(val) {
    try {
      localStorage.setItem('savedState', JSON.stringify({
        siteOpacity: val.siteOpacity,
        loaded: val.loaded,
        muted: val.muted,
        shareMode: val.shareMode,
        beat: val.beat,
        lastChapter: val.lastChapter,
        firstTime: val.firstTime
      }));
    } catch (e) {
      //Oops.  No local storage?
      console.error(e);
    }
  }

  hashChanged(e) {
    if (window.location.hash.startsWith('#chapter-')) {
      let chapter = (+window.location.hash.replace('#chapter-', ''));

      this.goChapter(chapter);
    }
  }

  goChapter(chapter) {
   this.setState({beat: HEART_BEAT_START, siteOpacity: 1});
   this.refs.heartbeat.play();

   this.refs[SCENES[this.state.lastChapter]].hide();
   this.refs[SCENES[this.state.lastChapter]].stop();

   this.refs[SCENES[chapter]].show();
   this.refs[SCENES[chapter]].play();

   this.setState({lastChapter: chapter});
  }

  windowResized() {
    if (isResizing) {
      clearTimeout(isResizing);
    }

    isResizing = setTimeout(() => this.setState({width: window.outerWidth, height: window.outerHeight}), 250);
  }

  loadingSceneDone() {
    setTimeout(() => this.setState({loaded: true}), this.state.beat);
  }

  theHeartBeats() {
    this.setState({beat: this.state.beat + HEART_BEAT_DECREASE, siteOpacity: Math.max(OPACITY_CUTOFF, this.state.siteOpacity - OPACITY_DECREASE)});
    /**
    if (this.state.siteOpacity < OPACITY_CUTOFF) {
      this.setState({beat: HEART_BEAT_START*10, siteOpacity: 0});
      this.refs[SCENES[this.state.lastMenu]].hide();
      setTimeout(() => this.setState({shareMode: true}), 2000);
    } else {
      this.setState({beat: this.state.beat + HEART_BEAT_DECREASE, siteOpacity: this.state.siteOpacity - OPACITY_DECREASE});
    }
     */
  }

  mouseMove(e) {
    let x = Math.floor(e.clientX / this.state.width * 100) * 0.8;
    let y = Math.floor(e.clientY / this.state.height * 100) * 0.8;

    this.setState({perspectiveX: x, perspectiveY: y});
  }

  menuChanged(menu) {
    window.location.hash = `#chapter-${menu.key}`;
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
    this.refs[SCENES[this.state.lastChapter]].show();
    this.refs[SCENES[this.state.lastChapter]].play();
  }

  get perspectiveOrigin() {
    return `${this.state.perspectiveX}% ${this.state.perspectiveY}%`;
  }

  render() {
    return (
      <div className={`App ${this.state.shareMode ? 'share-mode' : 'story-mode'} ${this.state.menuOpen ? 'menu-open' : 'menu-closed'}`} >
        <section className="support">
          <div className="wrapper">
            <h2>Raise awareness for the Anthropocene.</h2>
            <h1>Share this story.</h1>

            <label onClick={this.resuscitate.bind(this)}>I want to keep watching.</label>
          </div>
        </section>

        <section className="main" style={{perspectiveOrigin: this.perspectiveOrigin}} onMouseMove={this.mouseMove.bind(this)}>
          <LoadingScene ref="loadingScene"
                        perspectiveX={this.state.perspectiveX}
                        perspectiveY={this.state.perspectiveY}
                        onNext={() => this.menuChanged({key:1})}
                        onCanPlay={this.increaseLoadingState.bind(this)}
                        onDone={this.loadingSceneDone.bind(this)}
                        muted={this.state.muted}
                        width={this.state.width}
                        height={this.state.height}
                        opacity={this.state.siteOpacity}
                        loadingState={this.state.loadingState}/>

          <SecondScene ref="secondScene"
                       perspectiveX={this.state.perspectiveX}
                       perspectiveY={this.state.perspectiveY}
                       width={this.state.width}
                       height={this.state.height}
                       opacity={this.state.siteOpacity}
                       onNext={() => this.menuChanged({key:2})}
                       onCanPlay={this.increaseLoadingState.bind(this)}/>

          <ThirdScene ref="thirdScene"
                      perspectiveX={this.state.perspectiveX}
                      perspectiveY={this.state.perspectiveY}
                      width={this.state.width}
                      height={this.state.height}
                      opacity={this.state.siteOpacity}
                      onNext={() => this.menuChanged({key:3})}
                      onCanPlay={this.increaseLoadingState.bind(this)}/>

          <FourthScene ref="fourthScene"
                       perspectiveX={this.state.perspectiveX}
                       perspectiveY={this.state.perspectiveY}
                       width={this.state.width}
                       height={this.state.height}
                       opacity={this.state.siteOpacity}
                       onNext={() => this.menuChanged({key:4})}
                       onCanPlay={this.increaseLoadingState.bind(this)}/>

          <FifthScene ref="fifthScene"
                      perspectiveX={this.state.perspectiveX}
                      perspectiveY={this.state.perspectiveY}
                      width={this.state.width}
                      height={this.state.height}
                      opacity={this.state.siteOpacity}
                      onCanPlay={this.increaseLoadingState.bind(this)}/>

          <ChapterMenu open={this.state.loaded} chapter={this.state.lastChapter} onMenuChange={this.menuChanged.bind(this)} opacity={this.state.siteOpacity}/>

          <menu className="top">
            <a href="#">The Film</a>
            <a href="#">VR Experience</a>
            <a href="#">Art Gallery</a>
          </menu>

          <menu className="controls">
            <IconButton icon="share-mdi" title="Share" onClick={this.beSocial.bind(this)}/>
            <IconButton icon="volume-up-btm"
                        iconActive="volume-off-btm"
                        title={this.state.muted ? "Sound On" : "Sound Off"}
                        active={this.state.muted} onClick={this.toggleMute.bind(this)}/>
          </menu>

          <IconButton className="menu" icon="bars-btm" iconActive="times" active={this.state.menuOpen} onClick={() => this.setState({menuOpen: !this.state.menuOpen})}/>
        </section>

        <MainMenu open={this.state.menuOpen} onCloseMenu={() => this.setState({menuOpen:false})} onMenuChange={this.menuChanged.bind(this)}/>


        <AudioPlayer src="audio/background.mp3" play={this.state.loaded} loop={true} volume={this.state.shareMode ? 0 : 50} muted={this.state.muted}/>
        <AudioPlayer src="audio/heartbeat.mp3" play={this.state.loaded} loop={true} onEnd={this.theHeartBeats.bind(this)} delay={this.state.beat} volume={50} muted={this.state.muted}/>
        <AudioPlayer ref="heartbeat" src="audio/heartbeat.mp3" volume={100} muted={this.state.muted}/>
      </div>
    )
  }
}

setTimeout(function() {
  ReactDOM.render(<App/>, document.getElementById('viewport'));
},1);

export default App;