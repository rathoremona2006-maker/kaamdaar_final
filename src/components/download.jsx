import React from 'react';
import './download.css';
import github from '../assets/github.png';
import twitter from '../assets/twitter.png';
import telegram from '../assets/telegram.png';

export default function Download() {
  return (
    <section className="download-section" id="download">
      <div className="dw-bg dw-bg-top"></div>
      <div className="dw-bg dw-bg-bottom"></div>

  
      <div className="community-part">
        <div className="community-badge">KAAMDAAR • COMMUNITY</div>
        <h1 className="community-title">Join Into Our <span>Hub</span></h1>

        <div className="community-cards">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="c-card">
            <div className="c-icon">
              <img src={github} alt="Github" />
            </div>
            <div className="c-text">
              <h3>Github</h3>
              <p>Open Source & Commit Code</p>
            </div>
          </a>

          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="c-card">
            <div className="c-icon">
              <img src={twitter} alt="Twitter" />
            </div>
            <div className="c-text">
              <h3>Twitter</h3>
              <p>Latest News & Updates</p>
            </div>
          </a>

          <a href="https://t.me" target="_blank" rel="noreferrer" className="c-card">
            <div className="c-icon">
              <img src={telegram} alt="Telegram" />
            </div>
            <div className="c-text">
              <h3>Telegram</h3>
              <p>Channel for Community</p>
            </div>
          </a>
        </div>
      </div>

    
      <div className="dw-divider"></div>


      <div className="ready-part">
        <h1 className="ready-title">Ready To <span>Download</span></h1>
        <p className="ready-desc">
          Your everyday services are just a tap away. Download the KAAMDAAR app and get<br />
          started in minutes. Har Kaam Turant.
        </p>

        <div className="store-btns">
          <a href="#" className="store-btn apple">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"/>
            <span className="store-line"></span>
            <span>Download On App Store</span>
          </a>
          <a href="#" className="store-btn google">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="play" />
            <span className="store-line"></span>
            <span>Download On Google Play</span>
          </a>
        </div>

      </div>
    </section>
  );
}