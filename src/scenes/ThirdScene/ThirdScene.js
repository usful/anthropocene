import 'styles/base.scss';
import './ThirdScene.scss';

import React, {Component} from 'react';

import SceneComponent from '../SceneComponent';
import TextRoll from '../../components/TextRoll/TextRoll';
import LargeButton from '../../components/LargeButton/LargeButton';
import InfoButton from '../../components/InfoButton/InfoButton';
import InfoSection from '../../components/InfoSection/InfoSection';

export default class ThirdScene extends SceneComponent {
  constructor(props) {
    super(props);

    this.name = 'ThirdScene';
  }

  skip() {
    this.setState({playing: true, skipped: true});
    this.refs.textRoll.skip();
  }

  render() {
    return (
      <div className={this.classes} style={this.style}>
        <div className="video-wrapper" style={this.videoStyle}>
          <video ref="video" loop onCanPlayThrough={this.fireCanPlay.bind(this)}>
            <source type="video/mp4" src="vids/water.mp4"/>
          </video>
        </div>

        <TextRoll ref="textRoll" style={{fontSize: '75%'}} align="left" visible={this.state.visible} onDone={this.props.onDone.bind(this)} >
          <span>Climate</span>
          <span>change,</span>
          <span>extinctions,</span>
          <span>invasive species,</span>
          <span>technofossils,</span>
          <span>anthroturbation,</span>
          <span>terraforming</span>
          <span>of</span>
          <span>land</span>
          <span>and</span>
          <span>redirection</span>
          <span>of</span>
          <span>water</span>
          <span>are</span>
          <span>all</span>
          <span>part</span>
          <span>of</span>
          <span>the</span>
          <span>indelible</span>
          <span>human</span>
          <span>signature.</span>
          <br/>
          <InfoButton onClick={this.toggleInfo.bind(this)}/>
          <LargeButton onClick={this.props.onNext} />
        </TextRoll>

        <InfoSection visible={this.state.showInfo} onClose={this.toggleInfo.bind(this)}>
          <h1>Hydro Dam, China</h1>
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