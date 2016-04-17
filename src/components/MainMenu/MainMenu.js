import 'styles/base.scss';
import './MainMenu.scss';

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import Logo from '../Logo/Logo';
import WordMark from '../WordMark/WordMark';
import IconButton from '../IconButton/IconButton';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      opacity: 0,
      hovering: false
    };
  }

  static defaultProps = {
    open: false,
    opacity: 1,
    onMenuChange: (e) => false,
    onCloseMenu: (e) => false,
    onSocial: (e) => false
  };

  menuClicked(menu) {
    this.setState({selected: menu.key});
    this.props.onMenuChange(menu);
  }

  render() {
    return (
      <div className={`MainMenu ${this.props.open ? 'open' : 'closed'}`} onCloseMenu={this.props.onCloseMenu}>

        <WordMark />

        <div className="left">
          <h1>The Site</h1>
          <menu>
            <a href="http://theanthropocene.org/anthropocene/">Anthropocene Defined</a>
            <hr/>
            <a href="http://theanthropocene.org/the-project/">The Project</a>
            <hr/>
            <a href="http://theanthropocene.org/about/">Team</a>
            <hr/>
            <a href="http://theanthropocene.org/partners/">Partners</a>
            <hr/>
            <a href="http://theanthropocene.org/blog/">The Hub</a>
          </menu>
        </div>

        <div className="right">
          <p>
            <strong>Anthropocene:</strong> we have reached an unprecedented moment in planetary history, where humans
            have more impact on the earth and it processes than all other natural forces combined.
          </p>
          <div className="share">
            <h1>Share</h1>
            <IconButton icon="facebook-official" title="Facebook" onClick={this.onSocial} />
            <IconButton icon="twitter" title="Twitter" onClick={this.onSocial} />
          </div>
        </div>

        <footer>
          <p>&copy; 2016 - Ed Burtynsky, you can put all your legal copy in here to protect the rights of the video and images used within in.  Etc.</p>
        </footer>
      </div>
    );
  }
}