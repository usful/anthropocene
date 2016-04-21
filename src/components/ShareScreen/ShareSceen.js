import './ShareScreen.scss';

import React, {Component} from 'react';

import IconButton from '../IconButton/IconButton';
import AtvImg from 'react-atv-img';

let arts = [
  'MN_AZ_01_12_SRC_HD.jpg',
  'MN_AZ_02_12_SRC_HD.jpg',
  'MN_HLV_08_08_SRC_HD.jpg',
  'MN_HLV_10_08_SRC_HD.jpg',
  'MN_NMX_01_12_SRC_HD.jpg',
  'MN_NMX_03_12_SRC_alt4_HD.jpg',
  'MN_NMX_04_12_SRC_alt4_HD.jpg',
  'MN_NMX_05_12_SRC_alt3_HD.jpg',
  'MN_NMX_06_12_SRC_alt5_HD.jpg',
  'RWE-Coal_6586019_alt1_HD.jpg',
  'RWE-Coal_6586067_HD.jpg',
  'RWE-Coal_6586071_alt1_HD.jpg',
  'RWE-Coal_6586151_alt1_HD.jpg',
  'RWE-Coal_6586181_alt1_HD.jpg',
  'RWE-Coal_6586270_alt1_HD.jpg',
  'RWE-Coal_6586286_alt1_HD.jpg',
  'RWE-Coal_6586287_alt1_HD.jpg',
  'RWE-Coal_6586332_alt1_HD.jpg',
  'RWE-Coal_6586339_alt1_HD.jpg',
  'RWE-Coal_6586366_alt1_HD.jpg',
  'RWE-Coal_6586449_alt1_HD.jpg'
];

export default class ShareScreen extends Component {
  static defaultProps = {
    visible: false,
    onClose: (e) => {}
  };

  constructor(props) {
    super(props);
  }

  get className() {
    return `ShareScreen ${this.props.visible ? 'visible' : 'not-visible'}`;
  }

  render() {
    return (
      <div className={this.className}>
        <h1>Share</h1>
        {arts.map(art =>
          <img src={`/img/art/${art}`} />
        )}
      </div>
    );
  }
}