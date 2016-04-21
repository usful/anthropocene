import 'styles/base.scss';
import './FourthScene.scss';

import React, {Component} from 'react';

import SceneComponent from '../SceneComponent';
import TextRoll from '../../components/TextRoll/TextRoll';
import LargeButton from '../../components/LargeButton/LargeButton';
import InfoButton from '../../components/InfoButton/InfoButton';
import InfoSection from '../../components/InfoSection/InfoSection';

export default class FourthScene extends SceneComponent {
  constructor(props) {
    super(props);

    this.name = 'FourthScene';
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
            <source type="video/mp4" src="vids/clip3.mp4"/>
          </video>
        </div>

        <TextRoll ref="textRoll" style={{textShadow: this.textShadow, fontSize: '75%'}} align="right" visible={this.state.visible} onDone={this.props.onDone.bind(this)} >
          <span>The</span>
          <strong>Anthropocene</strong>
          <strong>Working</strong>
          <strong>Group,</strong>
          <span>a</span>
          <span>group</span>
          <span>of</span>
          <span>scientists</span>
          <span>and</span>
          <span>geologists,</span>
          <span>has</span>
          <span>proposed</span>
          <span>the</span>
          <span>title</span>
          <span>Anthropocene</span>
          <span>as</span>
          <span>the</span>
          <span>name</span>
          <span>of</span>
          <span>our</span>
          <span>current</span>
          <span>geological</span>
          <span>epoch,</span>
          <span>in</span>
          <span>recognition</span>
          <span>of</span>
          <span>profound</span>
          <strong>human</strong>
          <span>impact.</span>
          <br/>
          <InfoButton onClick={this.toggleInfo.bind(this)}/>
          <LargeButton onClick={this.props.onNext} />
        </TextRoll>

        <InfoSection visible={this.state.showInfo} onClose={this.toggleInfo.bind(this)}>
          <h1>Extractor, China</h1>
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