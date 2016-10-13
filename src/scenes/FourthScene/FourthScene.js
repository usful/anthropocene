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
          <img src={`${this.baseUrl}/vids/clip13.jpg`} onLoad={this.posterLoaded.bind(this)}/>
          <video ref="video" loop onCanPlayThrough={this.fireCanPlay.bind(this)}>
            <source type="video/mp4" src={`${this.baseUrl}/vids/clip13.mp4`}/>
          </video>
        </div>

        <TextRoll ref="textRoll" style={{fontSize: '80%'}} align="right" visible={this.state.visible} onDone={this.props.onDone.bind(this)} >
          <span>This</span>
          <span>multidisciplinary</span>
          <span>project</span>
          <span>combines</span>
          <span>art,</span>
          <span>film,</span>
          <span>virtual</span>
          <span>reality</span>
          <span>and</span>
          <span>scientific</span>
          <span>research</span>
          <span>to</span>
          <span>investigate</span>
          <span>human</span>
          <span>influence</span>
          <span>on</span>
          <span>the</span>
          <span>state,</span>
          <span>dynamics</span>
          <span>and</span>
          <span>future</span>
          <span>of</span>
          <span>the</span>
          <span>Earth.</span>
          <br/>
          <InfoButton onClick={this.toggleInfo.bind(this)}/>
          <LargeButton text="Share" icon="share-mdi" onClick={e => this.props.onBeSocial()} width={15} />
        </TextRoll>

        <InfoSection visible={this.state.showInfo} onClose={this.toggleInfo.bind(this)}>
          <h1>Coal Train, Wyoming, USA</h1>
          <p>
            The state of Wyoming boasts 19 coal mines, 18 of which are active and 8 of which are ranked as the top
            producing mines in the United States. In 2014, the North Antelope Rochelle Mine produced 117,963,515 short
            tons of coal (1 short ton = 2,000 lbs).
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