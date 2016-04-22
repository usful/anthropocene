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
import LargeButton from '../components/LargeButton/LargeButton';

import LoadingScene from '../scenes/LoadingScene/LoadingScene';
import SecondScene from '../scenes/SecondScene/SecondScene';
import ThirdScene from '../scenes/ThirdScene/ThirdScene';
import FourthScene from '../scenes/FourthScene/FourthScene';
import FifthScene from '../scenes/FifthScene/FifthScene';

import ShareScreen from '../components/ShareScreen/ShareSceen';

let isResizing; //timeout reference to track if the user is currently resizing the window.

const HEART_BEAT_DECREASE = 250; //ms
const OPACITY_DECREASE = 0.08; //of 100%
const OPACITY_CUTOFF = 0.25; //the point at which to trigger the sharing page.
const SCENES = ['loadingScene', 'secondScene', 'thirdScene', 'fourthScene', 'fifthScene'];
const HEART_BEAT_START = 1000; //ms

const DEFAULT_STATE = {
  siteOpacity: 1,
  loaded: false,
  muted: false,
  shareMode: false,
  sharing: false,
  beat: HEART_BEAT_START,
  lastChapter: 0,
  firstTime: true,
  menuOpen: false,
  rightPanelOpen: false,
  resuscitating: false
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

      if (this.state.lastChapter === chapter) return;

      this.goChapter(chapter);
    }
  }

  goChapter(chapter) {
    this.resuscitate();
    this.setState({rightPanelOpen: false});

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

  enterShareMode() {
    this.setState({beat: HEART_BEAT_START*10, siteOpacity: 0});
    this.refs[SCENES[this.state.lastChapter]].hide();
    setTimeout(() => this.setState({shareMode: true}), 2000);
  }

  theHeartBeats() {
    if (this.state.resuscitating) {
      this.setState({resuscitating: false});
      return;
    }

    if (this.state.siteOpacity < OPACITY_CUTOFF) {
      return this.enterShareMode();
    }

    this.setState({
      beat: this.state.beat + (this.state.sharing ? 0 : HEART_BEAT_DECREASE),
      siteOpacity: this.state.siteOpacity - (this.state.sharing ? 0 : OPACITY_DECREASE)
    });
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
    this.setState({beat: HEART_BEAT_START, siteOpacity: 1, sharing: !this.state.sharing});
    this.refs.heartbeat.play();
  }

  increaseLoadingState() {
    this.setState({loadingState: this.state.loadingState + 1});
  }

  resuscitate() {
    this.setState({beat: HEART_BEAT_START, siteOpacity: 1, resuscitating: true});
    this.refs.heartbeat.play();
  }

  resuscitateAndShare() {
    this.keepWatching();
    setTimeout(() => this.beSocial(), 1000);
  }

  keepWatching() {
    this.resuscitate();
    this.setState({shareMode: false});
    this.refs[SCENES[this.state.lastChapter]].show();
    this.refs[SCENES[this.state.lastChapter]].play();
  }

  toggleRightPanel() {
    this.resuscitate();
    this.setState({rightPanelOpen: !this.state.rightPanelOpen});
  }

  onMenuSocial() {
    this.setState({menuOpen: false});
    this.beSocial();
  }

  closeRightPanel() {
    this.setState({rightPanelOpen: false});
  }

  get perspectiveOrigin() {
    return `${this.state.perspectiveX}% ${this.state.perspectiveY}%`;
  }

  get className() {
    return `App ${this.state.shareMode ? 'share-mode' : 'story-mode'} ${this.state.menuOpen ? 'menu-open' : 'menu-closed'} ${this.state.rightPanelOpen ? 'right-panel' : 'no-right-panel'} ${this.state.sharing ? 'sharing' : 'not-sharing'}`;
  }

  render() {
    return (
      <div className={this.className}>

        <section className="main" style={{perspectiveOrigin: this.perspectiveOrigin}}
                 onMouseMove={this.mouseMove.bind(this)}>
          <LoadingScene ref="loadingScene"
                        perspectiveX={this.state.perspectiveX}
                        perspectiveY={this.state.perspectiveY}
                        onNext={() => this.menuChanged({key:1})}
                        onCanPlay={this.increaseLoadingState.bind(this)}
                        onCloseRightPanel={this.closeRightPanel.bind(this)}
                        onToggleRightPanel={this.toggleRightPanel.bind(this)}
                        onDone={this.loadingSceneDone.bind(this)}
                        onResuscitate={this.resuscitate.bind(this)}
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
                       onResuscitate={this.resuscitate.bind(this)}
                       onCloseRightPanel={this.closeRightPanel.bind(this)}
                       onToggleRightPanel={this.toggleRightPanel.bind(this)}
                       onNext={() => this.menuChanged({key:2})}
                       onCanPlay={this.increaseLoadingState.bind(this)}/>

          <ThirdScene ref="thirdScene"
                      perspectiveX={this.state.perspectiveX}
                      perspectiveY={this.state.perspectiveY}
                      width={this.state.width}
                      height={this.state.height}
                      opacity={this.state.siteOpacity}
                      onResuscitate={this.resuscitate.bind(this)}
                      onCloseRightPanel={this.closeRightPanel.bind(this)}
                      onToggleRightPanel={this.toggleRightPanel.bind(this)}
                      onNext={() => this.menuChanged({key:3})}
                      onCanPlay={this.increaseLoadingState.bind(this)}/>

          <FourthScene ref="fourthScene"
                       perspectiveX={this.state.perspectiveX}
                       perspectiveY={this.state.perspectiveY}
                       width={this.state.width}
                       height={this.state.height}
                       opacity={this.state.siteOpacity}
                       onResuscitate={this.resuscitate.bind(this)}
                       onCloseRightPanel={this.closeRightPanel.bind(this)}
                       onToggleRightPanel={this.toggleRightPanel.bind(this)}
                       onNext={() => this.menuChanged({key:4})}
                       onCanPlay={this.increaseLoadingState.bind(this)}/>

          <FifthScene ref="fifthScene"
                      perspectiveX={this.state.perspectiveX}
                      perspectiveY={this.state.perspectiveY}
                      width={this.state.width}
                      height={this.state.height}
                      opacity={this.state.siteOpacity}
                      onResuscitate={this.resuscitate.bind(this)}
                      onCloseRightPanel={this.closeRightPanel.bind(this)}
                      onToggleRightPanel={this.toggleRightPanel.bind(this)}
                      onCanPlay={this.increaseLoadingState.bind(this)}/>

          <ChapterMenu open={this.state.loaded} chapter={this.state.lastChapter}
                       onMenuChange={this.menuChanged.bind(this)} opacity={this.state.siteOpacity}/>

          <menu className="top">
            <a href="http://theanthropocene.org/film/">Feature Film</a>
            <a href="http://theanthropocene.org/gigapixel/">Gigapixel</a>
            <a href="http://theanthropocene.org/photogrammetry/">Photogrammetry</a>
            <a href="http://theanthropocene.org/360vr/">360&deg; VR</a>
          </menu>

          <menu className="controls">
            <IconButton icon="share-mdi" title="Share" onClick={this.beSocial.bind(this)}/>
            <IconButton icon="volume-up-btm"
                        iconActive="volume-off-btm"
                        title={this.state.muted ? "Sound On" : "Sound Off"}
                        active={this.state.muted} onClick={this.toggleMute.bind(this)}/>
          </menu>

          <IconButton className="menu" icon="bars-btm" iconActive="times" active={this.state.menuOpen}
                      onClick={() => this.setState({menuOpen: !this.state.menuOpen})}/>

        </section>

        <section className="support">
          <div className="share-wrapper">
            <h2>
              This experience will slowly die if nothing is done. The more you interact with the experience, the more it stays alive.
              Help us raise awareness for the Anthropocene by sharing this experience.
            </h2>

            <LargeButton text="Share" icon="share-mdi" onClick={this.resuscitateAndShare.bind(this)} />

            <label className="watch" onClick={this.keepWatching.bind(this)}>I want to keep watching.</label>
          </div>
        </section>

        <ShareScreen visible={this.state.sharing} onClose={this.beSocial.bind(this)}/>

        <MainMenu open={this.state.menuOpen}
                  onSocial={() => this.onMenuSocial()}
                  onCloseMenu={() => this.setState({menuOpen:false})}
                  onMenuChange={this.menuChanged.bind(this)}/>


        <AudioPlayer src="audio/background.mp3" play={this.state.loaded} loop={true}
                     volume={this.state.shareMode ? 0 : 50} muted={this.state.muted}/>
        <AudioPlayer src="audio/heartbeat.mp3" play={this.state.loaded} loop={true}
                     onEnd={this.theHeartBeats.bind(this)} delay={this.state.beat} volume={50}
                     muted={this.state.muted}/>
        <AudioPlayer ref="heartbeat" src="audio/heartbeat.mp3" volume={100} muted={this.state.muted}/>
      </div>
    )
  }
}

setTimeout(function() {
  ReactDOM.render(<App/>, document.getElementById('viewport'));
},1);

export default App;