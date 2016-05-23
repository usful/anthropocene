import 'styles/base.scss';
import './SecondScene.scss';

import React, {Component} from 'react';

import SceneComponent from '../SceneComponent';
import TextRoll from '../../components/TextRoll/TextRoll';
import LargeButton from '../../components/LargeButton/LargeButton';
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
          <img src="vids/clip7.jpg" onLoad={this.posterLoaded.bind(this)}/>
          <video ref="video" loop onCanPlayThrough={this.fireCanPlay.bind(this)} >
            <source type="video/mp4" src="vids/clip7.mp4"/>
          </video>
        </div>

        <TextRoll ref="textRoll" style={{fontSize: '90%'}}  align={"right"} visible={this.state.visible} onDone={this.props.onDone.bind(this)} >
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
          <LargeButton onClick={this.props.onNext} />
        </TextRoll>

        <InfoSection visible={this.state.showInfo} onClose={this.toggleInfo.bind(this)}>
          <h1>Hambach Lignite Mine, Germany</h1>
          <p>
            The Hambach Mine is the largest human-made hole in Europe; 1,500 ft. deep. Germany produces about 30
            million tons of lignite (the name for soft, brown coal) per year.
          </p>
          <p>
            The Hambach Mine presents an example of terraforming on a massive scale.
          </p>
          <footer>Source: Courtesy of Anthropocene Films</footer>
          <footer>Reference: <a href="http://www.fastcoexist.com/3031997/take-a-trip-to-this-horrifying-mine-one-of-the-largest-man-made-holes-in-the-world">Fast Company, Co.Exist</a></footer>
        </InfoSection>
      </div>
    )
  }
}