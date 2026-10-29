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

    experience: `Guest satisfaction, safety, and an authentic wilderness experience guide everything we do. Our forest-certified boats are equipped with modern life vests and captained by skilled local navigators who know every creek and tidal rhythm. Whether booking a private family charter or joining a group wildlife safari, we ensure an informative, serene, and unforgettable journey through the mangrove rivers.`
  };

  const handleContactNavigation = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="about-section">
      <div className="about-container">

        {/* Left Column Content */}
        <div className="about-left">

          <div className="sub-badge">
            <span className="arrow-dash">➔</span>
            <span>About Us</span>
            <span className="sparkle">✦</span>
          </div>

          <h1 className="about-heading">
            Bhitarakanika Boat Service – Discover Nature's Hidden Paradise
          </h1>

          <p className="about-subheading">
            Explore the beautiful waterways and extraordinary wildlife of Bhitarkanika with an unforgettable boat journey.
          </p>

          {/* Interactive Navigation Tabs */}
          <div className="tabs-container">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              <span className="tab-icon">🎯</span>
              <span>Our Mission</span>
            </button>

            <button
              type="button"
              className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              <span className="tab-icon">🌿</span>
              <span>Guest Experience</span>
            </button>
          </div>

          {/* Tab Description Paragraph */}
          <p className="tab-description">
            {tabContent[activeTab]}
          </p>

          {/* Bottom Call To Action */}
          <div className="about-bottom">
            <button 
              type="button" 
              className="cta-btn primary-btn"
              onClick={handleContactNavigation}
            >
              <span>Contact Us</span>
              <span className="cta-arrow">➔</span>
            </button>
          </div>

        </div>

        {/* Right Column Image Grid */}
        <div className="about-right">
          <div className="grid-col left-col">
            <div className="img-wrapper tall">
              <img
                src={aboutImg1}
                alt="Mangrove creek canopy in Bhitarkanika"
              />
            </div>
            <div className="img-wrapper medium">
              <img
                src={aboutImg3}
                alt="Kingfisher perched in Bhitarkanika sanctuary"
              />
            </div>
          </div>

          <div className="grid-col right-col">
            <div className="img-wrapper medium">
              <img
                src={aboutImg2}
                alt="Saltwater crocodile basking on river mudbank"
              />
            </div>
            <div className="img-wrapper tall">
              <img
                src={aboutImg4}
                alt="White crocodile in Bhitarkanika National Park"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Aboutt;