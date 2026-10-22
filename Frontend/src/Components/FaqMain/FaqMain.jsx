import React, { useState } from "react";
import "./FaqMain.css";

const faqItems = [
  {
    number: "01",
    question: "What is the best time to visit Bhitarkanika?",
    category: "Planning",
    answer:
      "October to March is generally a comfortable time to explore Bhitarkanika. Enjoy boat journeys, birdwatching, and the mangrove landscape. Always check local park schedules and seasonal restrictions before travelling.",
  },
  {
    number: "02",
    question: "How can I reach Bhitarkanika National Park?",
    category: "Travel",
    answer:
      "Bhitarkanika is in Kendrapara district, Odisha. Visitors commonly travel by road to access points such as Khola or Gupti and continue by boat where required. Confirm your entry point before starting your journey.",
  },
  {
    number: "03",
    question: "Are boat rides available inside Bhitarkanika?",
    category: "Boat Safari",
    answer:
      "Authorised boat services operate on designated waterways, subject to local rules, weather, and availability. Follow your operator's safety instructions and avoid disturbing the wildlife.",
  },
  {
    number: "04",
    question: "Can I see saltwater crocodiles during my visit?",
    category: "Wildlife",
    answer:
      "Bhitarkanika is famous for its saltwater crocodiles, but sightings cannot be guaranteed. Stay inside authorised boats or designated viewing areas and follow your guide's instructions.",
  },
  {
    number: "05",
    question: "Do I need permission or an entry ticket?",
    category: "Entry",
    answer:
      "Entry fees and permissions depend on current forest department rules and your selected route. Check the latest official information before visiting.",
  },
  {
    number: "06",
    question: "Is Bhitarkanika suitable for a family trip?",
    category: "Family Travel",
    answer:
      "A family visit can be a wonderful nature experience. Choose a suitable route, carry drinking water and sun protection, and follow all safety instructions from authorised operators.",
  },
  {
    number: "07",
    question: "What should I carry for a boat trip?",
    category: "Travel Tips",
    answer:
      "Carry drinking water, sunscreen, a hat, comfortable clothing, your camera, and any required identification. Keep your belongings secure and take all waste back with you.",
  },
  {
    number: "08",
    question: "Can I arrange a boat or tour in advance?",
    category: "Booking",
    answer:
      "Advance arrangements may be available depending on the operator and season. Confirm the departure point, trip duration, price, inclusions, and cancellation policy before booking.",
  },
];

const FaqMain = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="FaqMain" id="faq">
      <div className="FaqMain__container">
        
        {/* Intro / Section Header */}
        <header className="FaqMain__intro">
          <div className="FaqMain__eyebrow">
            <span />
            HERE TO HELP YOU
            <span />
          </div>

          <h2 className="FaqMain__title">
            Frequently Asked <span>Questions</span>
          </h2>

          <p className="FaqMain__description">
            Everything you need to know before exploring the mangroves, wildlife, and waterways of Bhitarkanika.
          </p>

          <div className="FaqMain__introBottom">
            <span className="FaqMain__introDot" />
            Your journey into the wild starts here.
          </div>
        </header>

        {/* Content Section (Both columns match height) */}
        <div className="FaqMain__content">
          
          {/* Left Side Matching Height Box */}
          <aside className="FaqMain__sideCard">
            {/* Watermark Leaf Shapes */}
            <div className="FaqMain__leaf FaqMain__leaf--one" />
            <div className="FaqMain__leaf FaqMain__leaf--two" />

            <div className="FaqMain__sideTop">
              <div className="FaqMain__sideIcon">
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <path
                    d="M24 5C14 5 8 12 8 21c0 7 4 11 10 15l6 7 6-7c6-4 10-8 10-15C40 12 34 5 24 5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 25c8 0 13-6 14-13-8 0-14 5-14 13Zm0 0c2 4 5 7 9 9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <span className="FaqMain__sideLabel">EXPLORE WITH CONFIDENCE</span>

              <h3 className="FaqMain__sideTitle">
                Nature has its own <span>beautiful answers.</span>
              </h3>

              <p className="FaqMain__sideText">
                A little preparation makes your Bhitarkanika experience more relaxing, memorable, and environmentally responsible.
              </p>
            </div>

            {/* Bottom block keeps it balanced as height grows */}
            <div className="FaqMain__sideBottom">
              <div className="FaqMain__sideDivider" />
              <div className="FaqMain__sideStat">
                <span aria-hidden="true">✦</span>
                <p>Travel responsibly. Leave nature untouched.</p>
              </div>

              <div className="FaqMain__sideQuickHelp">
                <div className="FaqMain__sideHelpText">
                  <span>Need personalized assistance?</span>
                  <p>Our tour guides and eco-help desk are available daily.</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Side Question Section */}
          <div className="FaqMain__accordion">
            <div className="FaqMain__accordionHeader">
              <div>
                <span className="FaqMain__sectionLabel">GOOD TO KNOW</span>
                <h3>Everything at a glance</h3>
              </div>

              <span className="FaqMain__questionCount">08 QUESTIONS</span>
            </div>

            <div className="FaqMain__list">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                const answerId = `FaqMain-answer-${index}`;

                return (
                  <article
                    className={`FaqMain__item ${isOpen ? "is-open" : ""}`}
                    key={item.number}
                  >
                    <button
                      type="button"
                      className="FaqMain__question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="FaqMain__number">{item.number}</span>

                      <span className="FaqMain__questionText">
                        {item.question}
                      </span>

                      <span className="FaqMain__plus" aria-hidden="true">
                        <span />
                        <span />
                      </span>
                    </button>

                    <div
                      className="FaqMain__answerWrap"
                      id={answerId}
                      aria-hidden={!isOpen}
                    >
                      <div className="FaqMain__answerInner">
                        <span className="FaqMain__answerCategory">
                          {item.category}
                        </span>

                        <p className="FaqMain__answer">{item.answer}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="FaqMain__bottomNote">
              <span className="FaqMain__bottomNoteIcon">i</span>
              <p>
                Entry rules, boat services, and seasonal access may change.
                Please verify current arrangements before your visit.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqMain;