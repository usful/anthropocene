import 'styles/base.scss';
import './SecondScene.scss';

import React, {Component} from 'react';

import SceneComponent from '../SceneComponent';
import TextRoll from '../../components/TextRoll/TextRoll';
import NextButton from '../../components/NextButton/NextButton';
import InfoButton from '../../components/InfoButton/InfoButton';
import InfoSection from '../../components/InfoSection/InfoSection';

export default class SecondScene extends SceneComponent {
  constructor(props) {
    super(props);

    this.name = 'SecondScene';
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
            <source type="video/mp4" src="vids/clip7.mp4"/>
          </video>
        </div>

        <TextRoll ref="textRoll" style={{textShadow: this.textShadow, fontSize: '90%'}}  align={"right"} visible={this.state.visible} onDone={this.props.onDone.bind(this)} >
          <span>As</span>
          <span>a</span>
          <span>species,</span>
          <span>humans</span>
          <span>now</span>
          <span>arguably</span>
          <span>change</span>
          <span>the</span>
          <span>earth</span>
          <span>and</span>
          <span>its</span>
          <span>processes</span>
          <span>more</span>
          <span>than</span>
          <span>all</span>
          <span>other</span>
          <span>natural</span>
          <span>forces</span>
          <span>combined.</span>
          <br/>
          <InfoButton onClick={this.toggleInfo.bind(this)}/>
          <NextButton onClick={this.props.onNext} />
        </TextRoll>

        <InfoSection visible={this.state.showInfo} onClose={this.toggleInfo.bind(this)}>
          <h1>Excavator, Ohio, USA</h1>
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