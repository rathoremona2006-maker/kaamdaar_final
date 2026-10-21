import React, { useState } from 'react';
import './faqs.css';
import faq_1 from '../assets/faq_1.png'; 
import faq_2 from '../assets/faq_2.png'; 

const faqData = [
  {
    id: 1,
    q: "What services can I book through Kaamdaar?",
    a: "You can book Plumbing, Cleaning, Painting, Moving, Electrician and many more vetted home services instantly with Kaamdaar.",
    hasImage: true
  },
  {
    id: 2,
    q: "How are service providers vetted and verified?",
    a: "All our pros go through background checks, skill tests, and document verification. Only top-rated and trusted professionals are listed.",
  },
  {
    id: 3,
    q: "Is Kaamdaar available in my city?",
    a: "We are currently live in Lahore, Karachi, Islamabad, Dubai, Noida and expanding to more cities every month.",
  },
  {
    id: 4,
    q: "Are payments secure on Kaamdaar?",
    a: "Yes! Kaamdaar offers secure digital payment options. You can pay safely via card, UPI, and wallets with encrypted transactions. You can also rate your service providers and share feedback after every job. Plus, our Turant Protection Guarantee ensures your payment is held securely until the job is completed to your satisfaction — we'll resolve any concerns quickly if something goes wrong.",
    hasImage2: true,
    isOpenDefault: true
  }
];

export default function FAQs() {
  const [openId, setOpenId] = useState(4);

  return (
    <section className="faqs-section" id="faqs">
      {/* Watercolor Background Elements */}
      <div className="faq-bg faq-bg-left"></div>
      <div className="faq-bg faq-bg-right"></div>
      <div className="faq-dot dot-1"></div>
      <div className="faq-dot dot-2"></div>

      <div className="faqs-header">
        <span className="faq-badge">KAAMDAAR • HELP CENTER</span>
        <h1>FREQUENTLY ASKED <span>QUESTIONS</span></h1>
        <p>Everything you need to know about booking services on Kaamdaar</p>
      </div>

      <div className="faqs-container">
        {/* LEFT COLUMN */}
        <div className="faqs-left">
          <div
            className={`faq-item ${openId === 1? 'faq-open' : ''}`}
            onClick={() => setOpenId(openId === 1? 0 : 1)}
          >
            <div className="faq-q">
              <span>1. What services can I book through Kaamdaar?</span>
              <span className="faq-arrow">{openId === 1? '˄' : '˅'}</span>
            </div>
            {openId === 1 && <div className="faq-a">{faqData[0].a}</div>}
          </div>

          {/* Illustration 1 - Center Image like screenshot */}
          <div className="faq-ill1">
            <img src={faq_1} alt="Kaamdaar FAQ" onError={(e) => e.target.style.display='none'} />
            {/* Fallback agar image nahi hai toh CSS se icon ayega */}
          </div>

          <div
            className={`faq-item ${openId === 2? 'faq-open' : ''}`}
            onClick={() => setOpenId(openId === 2? 0 : 2)}
          >
            <div className="faq-q">
              <span>2. How are service providers vetted and verified?</span>
              <span className="faq-arrow">{openId === 2? '˄' : '˅'}</span>
            </div>
            {openId === 2 && <div className="faq-a">{faqData[1].a}</div>}
          </div>

          <div
            className={`faq-item ${openId === 3? 'faq-open' : ''}`}
            onClick={() => setOpenId(openId === 3? 0 : 3)}
          >
            <div className="faq-q">
              <span>3. Is Kaamdaar available in my city?</span>
              <span className="faq-arrow">{openId === 3? '˄' : '˅'}</span>
            </div>
            {openId === 3 && <div className="faq-a">{faqData[2].a}</div>}
          </div>
        </div>

        {/* RIGHT COLUMN - Open Card */}
        <div className="faqs-right">
          <div
            className={`faq-item faq-item-highlight ${openId === 4? 'faq-open' : ''}`}
            onClick={() => setOpenId(openId === 4? 0 : 4)}
          >
            <div className="faq-q">
              <span>4. Are payments secure on Kaamdaar?</span>
              <span className="faq-arrow">{openId === 4? '˄' : '˅'}</span>
            </div>
            {openId === 4 && (
              <>
                <div className="faq-a">{faqData[3].a}</div>
                <div className="faq-ill2">
                  <img src={faq_2} alt="Secure Payment" onError={(e) => e.target.style.display='none'} />
                </div>
              </>
            )}
          </div>

          <h2 className="faq-slogan">Har Kaam Turant</h2>
        </div>
      </div>
    </section>
  );
}