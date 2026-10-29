import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Aboutt.css';

import aboutImg1 from '../../assets/1.jpeg';
import aboutImg2 from '../../assets/2.jpg';
import aboutImg3 from '../../assets/3.jpeg';
import aboutImg4 from '../../assets/4.jpg';

const Aboutt = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const navigate = useNavigate();

  const tabContent = {
    mission: `At Bhitarakanika Boat Service, our mission is to help visitors discover the incredible beauty of Bhitarkanika, Odisha. We offer memorable boat journeys through peaceful mangrove creeks, lush green forests, and remarkable wildlife habitats. From spotting colourful kingfishers to witnessing the natural home of saltwater crocodiles, we aim to make every journey comfortable, enjoyable, and connected to nature.`,

    customer: `Your comfort, safety, and experience are at the heart of our service. Whether you are visiting with family, friends, or fellow nature lovers, we help you experience the beauty of Bhitarkanika through enjoyable boat rides and scenic waterways. Our goal is to make your visit smooth and memorable, with friendly assistance and an opportunity to appreciate the region's unique wildlife, mangroves, and natural surroundings.`
  };

  const handleContactNavigation = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="about-section">
      <div className="about-container">

        {/* Left Column */}
        <div className="about-left">

          <div className="sub-badge">
            <span className="arrow-dash">➔</span>
            About Us
            <span className="sparkle">✦</span>
          </div>

          <h1 className="about-heading">
            Bhitarakanika Boat Service – Discover Nature's Hidden Paradise
          </h1>

          <p className="about-intro">
            Explore the beautiful waterways and extraordinary wildlife
            of Bhitarkanika with an unforgettable boat journey.
          </p>

          {/* Interactive Tabs */}
          <div className="tabs-container">
            <button
              type="button"
              className={`tab-btn ${
                activeTab === 'mission' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('mission')}
              aria-pressed={activeTab === 'mission'}
            >
              <span className="tab-icon">🎯</span>
              <span>Our Mission</span>
            </button>

            <button
              type="button"
              className={`tab-btn ${
                activeTab === 'customer' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('customer')}
              aria-pressed={activeTab === 'customer'}
            >
              <span className="tab-icon">🌿</span>
              <span>Guest Experience</span>
            </button>
          </div>

          {/* Dynamic Content */}
          <p className="tab-description" key={activeTab}>
            {tabContent[activeTab]}
          </p>

          {/* Bottom Action */}
          <div className="about-bottom">
            <button
              type="button"
              className="cta-btn primary-btn"
              onClick={handleContactNavigation}
            >
              <span>Contact Us</span>

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

        {/* Right Column - Bhitarkanika Image Grid */}
        <div className="about-right">

          <div className="grid-col left-col">

            <div className="img-wrapper tall">
              <img
                src={aboutImg1}
                alt="Beautiful green mangrove waterways of Bhitarkanika"
                loading="lazy"
              />

              <div className="image-caption">
                <span>Mangrove Beauty</span>
              </div>
            </div>

            <div className="img-wrapper medium">
              <img
                src={aboutImg2}
                alt="Colourful kingfisher in the natural surroundings of Bhitarkanika"
                loading="lazy"
              />

              <div className="image-caption">
                <span>Birdwatching</span>
              </div>
            </div>

          </div>

          <div className="grid-col right-col">

            <div className="img-wrapper medium">
              <img
                src={aboutImg3}
                alt="Saltwater crocodile resting along the Bhitarkanika riverbank"
                loading="lazy"
              />

              <div className="image-caption">
                <span>Wildlife Discovery</span>
              </div>
            </div>

            <div className="img-wrapper tall">
              <img
                src={aboutImg4}
                alt="Bhitarkanika wildlife and natural habitat"
                loading="lazy"
              />

              <div className="image-caption">
                <span>Nature Adventures</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Aboutt;