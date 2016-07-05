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
          <img src={`${this.baseUrl}/vids/water.jpg`} onLoad={this.posterLoaded.bind(this)}/>
          <video ref="video" loop onCanPlayThrough={this.fireCanPlay.bind(this)}>
            <source type="video/mp4" src={`${this.baseUrl}/vids/water.mp4`}/>
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
          <h1>Xiaolangdi Dam, Henan Province, China</h1>
          <p>
            The Xiaolangdi Dam on the Yellow River in China produces 5.1 billion kWh of electricity per year.
            Every year, 30 million tons of silt are released, and the event has become a tourist attraction.
          </p>
          <p>
            The Xiolangdi dam presents an example of anthropogenic sediment displacement.
          </p>
          <footer>Source: Courtesy of Watermark, 2013</footer>
          <footer>Reference: <a href="http://www.power-technology.com/projects/xiaolangdi/">Power Technology.com</a></footer>
        </InfoSection>
      </div>
    )
  }
}