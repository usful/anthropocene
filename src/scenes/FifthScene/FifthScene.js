import 'styles/base.scss';
import './FifthScene.scss';

import React, {Component} from 'react';

import SceneComponent from '../SceneComponent';
import TextRoll from '../../components/TextRoll/TextRoll';
import InfoButton from '../../components/InfoButton/InfoButton';
import LargeButton from '../../components/LargeButton/LargeButton';
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
          <video ref="video" loop onCanPlayThrough={this.fireCanPlay.bind(this)}>
            <source type="video/mp4" src="vids/clip13.mp4"/>
          </video>
        </div>

        <TextRoll ref="textRoll" style={{fontSize: '100%'}} align="left" visible={this.state.visible} onDone={this.props.onDone.bind(this)}>
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
          <InfoButton onClick={e => this.toggleInfo()}/>
          <LargeButton onClick={e => this.props.onBeSocial()} text="Share" icon="share-mdi" width="13" />
        </TextRoll>


        <InfoSection visible={this.state.showInfo} onClose={this.toggleInfo.bind(this)}>
          <h1>Coal Train, Wisconsin, USA</h1>
          <p>
            While the state of Wisconsin does not produce coal, the resource dominates the state’s electricity
            generation (reaching 55.9% in 2015). In 2014, total U.S. coal production surpassed 1 billion
            short tons (1 short ton = 2,000 lbs).
          </p>
          <p>
            Atmospheric carbon levels in the Anthropocene are higher than at any other point in the last 400,000 years.
          </p>
          <footer>Source: Courtesy of Anthropocene Films</footer>
          <footer>Reference: <a href="http://www.eia.gov/coal/annual/">EIA</a></footer>
          <footer>Reference: <a href="http://climate.nasa.gov/climate_resources/24/ ">NASA</a></footer>
        </InfoSection>
      </div>
    )
  }
}