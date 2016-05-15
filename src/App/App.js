import 'suitcss-base';
import 'styles/base.scss';
import './App.scss';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import track from '../utils/track';
import bowser from 'bowser';

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

import ShareScreen from '../components/ShareScreen/ShareScreen';

let isResizing; //timeout reference to track if the user is currently resizing the window.

const HEART_BEAT_DECREASE = 250; //ms
const OPACITY_DECREASE = 0.08; //of 100%
const OPACITY_CUTOFF = 0.25; //the point at which to trigger the sharing page.
const SCENES = ['loadingScene', 'secondScene', 'thirdScene', 'fourthScene', 'fifthScene'];
const HEART_BEAT_START = 1000; //ms

const TOTAL_SCENES = SCENES.length; // total amount of scenes, for loading purposes.
let navStack = [];

const DEFAULT_STATE = {
  siteOpacity: 1,
  loaded: false,
  muted: false,
  shareMode: false,
  sharing: false,
  beat: HEART_BEAT_START,
  lastChapter: -1,
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
      //TODO: add back in when we are ready to persist states.
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

  navStart() {
    window.location.hash = '#chapter-0';
  }

  navBack() {
    track('nav', 'back');

    //If there is nothing to go back to, then go to chapter 0.
    if (navStack.length > 1) {
      window.history.go(-1);
      return;
    }

    this.navStart();
  }

  hashChanged(e) {
    let nextHash = window.location.hash;
    let lastHash = navStack[navStack.length-1];

    track('nav', nextHash.replace('#', ''));

    //Some simple navigation that allows deep-linking.
    //Close whatever we were looking at last.
    if (lastHash === '#share') {
      this._beSocial();
    } else if (lastHash === '#menu') {
      this._toggleMenu();
    } else if (lastHash === '#do-something') {
      //TODO: what do we do here?
    }

    if (nextHash.startsWith('#chapter-')) {
      let chapter = (+nextHash.replace('#chapter-', ''));

      if (this.state.lastChapter !== chapter) {
        this.goChapter(chapter);
      }

    } else {

      if (nextHash.startsWith('#share')) {
        this._beSocial();
      } else if (nextHash.startsWith('#menu')) {
        this._toggleMenu();
      } else if (nextHash.startsWith('#do-something')) {
        this.enterShareMode();
      }

      //If the page is on first load, and hasn't loaded a chapter yet, play chapter-0.
      if (!lastHash) this.goChapter({key:0});
    }

    navStack.push(nextHash);
  }

  goChapter(chapter) {
    let lastChapter = this.refs[SCENES[this.state.lastChapter]];
    let nextChapter =  this.refs[SCENES[chapter]];

    this.resuscitate();
    this.setState({rightPanelOpen: false});

    if (lastChapter) {
      lastChapter.hide();
      lastChapter.stop();
    }

    if (nextChapter) {
      nextChapter.show();
      nextChapter.play();
    }

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
    track('died');

    this.setState({beat: HEART_BEAT_START*10, siteOpacity: 0});
    this.refs[SCENES[this.state.lastChapter]].hide();
    setTimeout(() => this.setState({shareMode: true}), 2000);
  }

  theHeartBeats() {
    track('beat', this.state.beat);

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
    //Doesn't run so well on IE any version
    if (bowser.msie || bowser.firefox) return;

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
    track('mute');
    this.setState({muted: !this.state.muted});
  }

  beSocial() {
    window.location.hash = '#share';
  }

  _beSocial() {
    this.setState({beat: HEART_BEAT_START, siteOpacity: 1, sharing: !this.state.sharing});
    this.refs.heartbeat.play();
  }

  increaseLoadingState() {
    this.setState({loadingState: this.state.loadingState + 1});

    if (this.state.loadingState >= TOTAL_SCENES - 1) {
      //Check to see if there is any hash tag at all
      if (window.location.hash == '') {
        this.navStart();
      } else {
        this.hashChanged();
      }


      //If we're not landing on the chapter-0, then mark the site as loaded.
      if (window.location.hash !== '#chapter-0') {
        this.refs.loadingScene.hide();
        this.loadingSceneDone();
      }
    }
  }

  resuscitate() {
    track('resuscitate');
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

  openMenu() {
    window.location.hash = '#menu';
  }

  _toggleMenu() {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  toggleRightPanel() {
    track('info', this.state.lastChapter);
    this.resuscitate();
    this.setState({rightPanelOpen: !this.state.rightPanelOpen});
  }

  onMenuSocial() {
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
    let events = {
      onCanPlayThrough: (e) => this.increaseLoadingState(),
      onResuscitate: (e) => this.resuscitate(),
      onCloseRightPanel: (e) => this.closeRightPanel(),
      onToggleRightPanel: (e) => this.toggleRightPanel(),
      onBeSocial: (e) => this.beSocial()
    };

    return (
      <div className={this.className}>

        <section className="main"
                 style={{perspectiveOrigin: this.perspectiveOrigin}}
                 onMouseMove={e => this.mouseMove(e)}>
          <LoadingScene ref="loadingScene"
                        muted={this.state.muted}
                        width={this.state.width}
                        height={this.state.height}
                        opacity={this.state.siteOpacity}
                        loadingState={this.state.loadingState}
                        onNext={e => this.menuChanged({key:1})}
                        onDone={e => this.loadingSceneDone()}
                        {... events} />

          <SecondScene ref="secondScene"
                       width={this.state.width}
                       height={this.state.height}
                       opacity={this.state.siteOpacity}
                       onNext={e => this.menuChanged({key:2})}
                       {... events} />

          <ThirdScene ref="thirdScene"
                      width={this.state.width}
                      height={this.state.height}
                      opacity={this.state.siteOpacity}
                      onNext={e => this.menuChanged({key:3})}
                      {... events} />

          <FourthScene ref="fourthScene"
                       width={this.state.width}
                       height={this.state.height}
                       opacity={this.state.siteOpacity}
                       onNext={e => this.menuChanged({key:4})}
                       {... events} />

          <FifthScene ref="fifthScene"
                      width={this.state.width}
                      height={this.state.height}
                      opacity={this.state.siteOpacity}
                      {... events} />

          <ChapterMenu open={this.state.loaded}
                       chapter={this.state.lastChapter}
                       onMenuChange={menu => this.menuChanged(menu)}
                       opacity={this.state.siteOpacity}/>

          <menu className="top">
            <li><a href="http://theanthropocene.org/anthropocene/">Anthropocene Defined</a></li>
            <li>
              <a href="http://theanthropocene.org/the-project/">Experience Anthropocene</a>
              <menu>
                <hr/>
                <a href="http://theanthropocene.org/gigapixel/">Gigapixel</a>
                <hr/>
                <a href="http://theanthropocene.org/360vr/">360&deg; VR</a>
                <hr/>
                <a href="http://theanthropocene.org/photogrammetry/">Photogrammetry</a>
              </menu>
            </li>
            <li>
              <a href="http://theanthropocene.org/about/">The</a>
              <menu>
                <hr/>
                <a href="http://theanthropocene.org/about/">Film Team</a>
                <hr/>
                <a href="http://theanthropocene.org/partners/">Partners</a>
              </menu>
            </li>
            <li><a className="last" href="http://theanthropocene.org/blog/">The Hub</a></li>
          </menu>

          <menu className="controls">
            <IconButton icon="share-mdi" title="Share" onClick={e => this.beSocial()}/>
            <IconButton icon="volume-up-btm"
                        iconActive="volume-off-btm"
                        title={this.state.muted ? "Sound On" : "Sound Off"}
                        active={this.state.muted}
                        onClick={e => this.toggleMute()}/>
          </menu>

          <IconButton className="menu"
                      icon="bars-btm"
                      iconActive="times"
                      active={this.state.menuOpen}
                      onClick={() => this.openMenu()}/>

        </section>

        <section className="support">
          <div className="share-wrapper">
            <h2>
              This experience will slowly die if nothing is done. The more you interact with the experience, the more it stays alive.
              Help us raise awareness for the Anthropocene by sharing this experience.
            </h2>

            <LargeButton text="Share" icon="share-mdi" onClick={e => this.resuscitateAndShare()} width={15} />

            <label className="watch" onClick={e => this.keepWatching()}>I want to keep watching.</label>
          </div>
        </section>

        <ShareScreen visible={this.state.sharing} onClose={e => this.navBack()}/>

        <MainMenu open={this.state.menuOpen}
                  onSocial={e => this.onMenuSocial()}
                  onCloseMenu={e => this.navBack()}
                  onMenuChange={e => this.menuChanged()}/>


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