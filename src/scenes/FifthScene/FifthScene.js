import 'styles/base.scss';
import './FifthScene.scss';

import React, {Component} from 'react';

import SceneComponent from '../SceneComponent';
import TextRoll from '../../components/TextRoll/TextRoll';
import InfoButton from '../../components/InfoButton/InfoButton';
import InfoSection from '../../components/InfoSection/InfoSection';

export default class FifthScene extends SceneComponent {
  constructor(props) {
    super(props);

    this.name = 'FifthScene';
  }

  skip() {
    this.setState({playing: true, skipped: true});
    this.refs.textRoll.skip();
  }

  render() {
    return (
      <div className={this.classes} style={this.style}>
        <div className="video-wrapper" style={this.videoStyle}>
          <video ref="video" loop onCanPlay={this.fireCanPlay.bind(this)}>
            <source type="video/mp4" src="vids/clip13.mp4"/>
          </video>
        </div>

        <TextRoll ref="textRoll" style={{textShadow: this.textShadow, fontSize: '100%'}} align="left" visible={this.state.visible} onDone={this.props.onDone.bind(this)}>
          <span>This</span>
          <span>Project</span>
          <span>aims</span>
          <span>to</span>
          <span>collect,</span>
          <span>display</span>
          <span>and</span>
          <span>debate</span>
          <span>the</span>
          <span>evidence</span>
          <span>of</span>
          <span>human</span>
          <span>planetary</span>
          <span>domination.</span>
          <br/>
          <InfoButton onClick={this.toggleInfo.bind(this)}/>
        </TextRoll>


        <InfoSection visible={this.state.showInfo} onClose={this.toggleInfo.bind(this)}>
          <h1>Coal trains, Pennsylvania USA</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec velit placerat
            risus malesuada euismod vitae at felis. Vestibulum ut scelerisque elit. Maecenas non
            laoreet leo.  Maecenas elementum tortor odio, a elementum sem hendrerit sit amet.
          </p>
          <footer>Source: <a href="#">http://www.theanthropocence.org</a></footer>
        </InfoSection>
      </div>
    )
  }
}