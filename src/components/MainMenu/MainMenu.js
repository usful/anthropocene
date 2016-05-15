import 'styles/base.scss';
import './MainMenu.scss';

import React, {Component} from 'react';

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
          <h1>Main Site</h1>
          <menu>
            <a href="http://theanthropocene.org/anthropocene/">Anthropocene Defined</a>
            <hr/>
            <a href="http://theanthropocene.org/the-project/">The Project</a>
            <hr/>
            <a href="http://theanthropocene.org/about/">The Team</a>
            <hr/>
            <a href="http://theanthropocene.org/blog/">The Hub</a>
          </menu>
        </div>

        <div className="right">
          <h1>The Projects</h1>
          <menu>
            <a href="http://theanthropocene.org/film/">Feature Film</a>
            <hr/>
            <a href="http://theanthropocene.org/gigapixel/">Gigapixel</a>
            <hr/>
            <a href="http://theanthropocene.org/photogrammetry/">Photogrammetry</a>
            <hr/>
            <a href="http://theanthropocene.org/360vr/">360&deg; VR</a>
          </menu>
        </div>

        <section>
          <p>
            <strong>Anthropocene:</strong> we have reached an unprecedented moment in planetary history, where humans
            have more impact on the earth and it processes than all other natural forces combined.
          </p>
          <div className="share">
            <h1>Subscribe to the mailing list.</h1>

            <div id="mc_embed_signup" className="mail-chimp">
              <form action="//facebook.us12.list-manage.com/subscribe/post?u=20653ac9dff2c4b7ae3422393&amp;id=02b5ebe7b1" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                <div id="mc_embed_signup_scroll">
                  <div style={{position:"absolute", left: -5000}} aria-hidden="true">
                    <input type="text" name="b_20653ac9dff2c4b7ae3422393_02b5ebe7b1" tabindex="-1" value=""/>
                  </div>
                  <input type="email" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
                  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
                </div>
              </form>
            </div>

            <br/>

            <h1>Share.</h1>
            <IconButton icon="facebook-official" title="Facebook" onClick={this.props.onSocial} />
            <IconButton icon="twitter" title="Twitter" onClick={this.props.onSocial} />
          </div>
        </section>

        <footer>
          <p>&copy; 2016 - Ed Burtynsky, you can put all your legal copy in here to protect the rights of the video and images used within in.  Etc.</p>
        </footer>

        <IconButton className="close" icon="times" activeIcon="menu" onClick={this.props.onCloseMenu} />
      </div>
    );
  }
}