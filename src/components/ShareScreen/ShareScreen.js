import './ShareScreen.scss';

import React, {Component} from 'react';

import clickLink from '../../utils/clickLink';
import track from '../../utils/track';

import IconButton from '../IconButton/IconButton';
import LargeButton from '../LargeButton/LargeButton';
import AtvImg from 'react-atv-img';

let arts = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
const ANIM_TIME = 250;

export default class ShareScreen extends Component {
  static defaultProps = {
    visible: false,
    onClose: (e) => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      sharing: false,
      sharingOpen: false,
      art: null
    };
  }

  close(e) {
    if (this.state.sharing) {
      this.closeSharing();
      return;
    }

    this.props.onClose(e);
  }

  componentWillMount() {
    arts.sort(() => Math.random() > 0.5 ? 1 : -1);
  }

  get className() {
    return `ShareScreen ${this.props.visible ? 'visible' : 'not-visible'} ${this.state.sharing ? 'sharing' : 'not-sharing'} ${this.state.sharingOpen ? 'sharing-open' : 'sharing-closing'}`;
  }

  startSharing(art) {
    track('sharing', 'open', art);

    setTimeout(() => {
      this.setState({sharing:true, art: art});

      setTimeout(() => {
        this.setState({sharingOpen: true});
      }, ANIM_TIME);
    }, ANIM_TIME);
  }

  closeSharing() {
    setTimeout(() => {
      this.setState({sharingOpen:false});

      setTimeout(() => {
        this.setState({sharing: false});
      }, ANIM_TIME);
    }, ANIM_TIME);
  }

  download() {
    track('sharing', 'download', this.state.art);
    clickLink(`/img/art/anthropocene-${this.state.art}b.jpg`, 'anthropocene.jpg');
  }

  postFacebook() {
    track('sharing', 'facebook', this.state.art);
    FB.ui({
      method: 'share',
      quote: 'Anthropocene, we have reached an unprecedented moment in planetary history, where humans have more impact on the earth and it processes than all other natural forces combined.',
      hashtag: 'anthropocene',
      href: 'http://theanthropocene.org/'
    }, function(response){
    });
  }

  postTwitter() {
    track('sharing', 'twitter', this.state.art);
    clickLink("https://twitter.com/intent/tweet?text=Anthropocene, we have reached an unprecedented moment in planetary history, where humans have more impact on the earth and it processes than all other natural forces combined.&url=http://theanthropocene.org");
  }

  render() {
    return (
      <div className={this.className}>
        <section className="arts">
          <h1>Share the Anthropocence.</h1>

          {arts.map(art =>
            <div key={art} className="art" onClick={(e) => this.startSharing(art)}>
              <AtvImg layers={[`/img/art/anthropocene-${art}.jpg`, '/img/art/layer-2.png']} style={{width: '20em', height: '20em'}} />
            </div>
          )}
        </section>

        <section className="share">
          <div className="share-wrapper">
            <div className="image">
              <img src={`/img/art/anthropocene-${this.state.art}b.jpg`}/>
            </div>

            <div className="buttons">
              <LargeButton icon="twitter" text="Tweet" width={18} onClick={e => this.postTwitter()}/>
              <LargeButton icon="facebook-official" text="Post" width={18} oClick={e => this.postFacebook()}/>
              <LargeButton icon="share" text="Download" width={18} onClick={e => this.download()}/>
            </div>
          </div>
        </section>

        <IconButton icon="times" onClick={(e) => this.close(e)}/>
      </div>
    );
  }
}