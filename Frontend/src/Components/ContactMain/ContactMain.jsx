
import React, { useState } from 'react'
import './ContactMain.css'

const LOCATION = {
  name: 'Bhitarkanika, Kendrapara',
  address: 'Bhitarkanika, Kendrapara, Odisha, India',
  email: 'info@yourdomain.com',
  phone: '+91 XXXXX XXXXX',
  query: 'Bhitarkanika National Park, Odisha, India',
}

const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  LOCATION.query
)}&z=12&output=embed`

const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  LOCATION.query
)}`

const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  LOCATION.query
)}`

const initialForm = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
  remember: false,
}

const ContactIcon = ({ type }) => {
  const paths = {
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.06 8.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z" />
    ),
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    subject: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h6" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8Z" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    external: (
      <>
        <path d="M14 3h7v7M21 3l-9 9" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </>
    ),
    headset: (
      <>
        <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
        <rect x="3" y="13" width="4" height="7" rx="2" />
        <rect x="17" y="13" width="4" height="7" rx="2" />
        <path d="M21 19a4 4 0 0 1-4 3h-4" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
  }

  return (
    <svg
      className={`ContactMain__svg ContactMain__svg--${type}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  )
}

const contactItems = [
  {
    id: 'location',
    eyebrow: 'VISIT OUR OFFICE',
    title: 'Our Location',
    lines: ['Bhitarkanika, Kendrapara', 'Odisha, India'],
    icon: 'location',
  },
  {
    id: 'email',
    eyebrow: 'DROP US AN EMAIL',
    title: 'Email Address',
    lines: [LOCATION.email, 'We would love to hear from you'],
    icon: 'email',
  },
  {
    id: 'phone',
    eyebrow: 'WE ARE HERE TO HELP',
    title: 'Call Us Anytime',
    lines: [LOCATION.phone, 'Connect with our team'],
    icon: 'phone',
  },
]

const ContactMain = () => {
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setSent(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Connect your backend API here to actually send the message.
    console.log('Contact form data:', form)

    setSent(true)
    setForm(initialForm)
  }

  return (
    <section className="ContactMain">
      <div className="ContactMain__container">

        <div className="ContactMain__grid">

          {/* LEFT: CONTACT FORM */}
          <div className="ContactMain__form-card">
            <div className="ContactMain__form-header">
              <span className="ContactMain__eyebrow">
                GET IN TOUCH
                <span className="ContactMain__eyebrow-line" />
              </span>

              <h2 className="ContactMain__form-title">
                Send Us a <span>Message</span>
              </h2>

              <p className="ContactMain__form-sub">
                Fill in the details below and we will get back to you.
              </p>

              <div className="ContactMain__paper-plane" aria-hidden="true">
                <span className="ContactMain__plane-circle">
                  <svg viewBox="0 0 24 24">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </span>
                <span className="ContactMain__plane-dot" />
              </div>
            </div>

            <form className="ContactMain__form" onSubmit={handleSubmit}>
              <div className="ContactMain__row">

                <div className="ContactMain__field">
                  <ContactIcon type="user" />
                  <input
                    id="ContactMain-name"
                    className="ContactMain__input"
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ContactMain__field">
                  <ContactIcon type="phone" />
                  <input
                    id="ContactMain-phone"
                    className="ContactMain__input"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ContactMain__field">
                  <ContactIcon type="email" />
                  <input
                    id="ContactMain-email"
                    className="ContactMain__input"
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ContactMain__field">
                  <ContactIcon type="subject" />
                  <input
                    id="ContactMain-subject"
                    className="ContactMain__input"
                    type="text"
                    name="subject"
                    placeholder="Subject *"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="ContactMain__field ContactMain__field--message">
                <ContactIcon type="message" />
                <textarea
                  id="ContactMain-message"
                  className="ContactMain__input ContactMain__textarea"
                  name="message"
                  placeholder="How can we help you? *"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <label className="ContactMain__check">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                <span className="ContactMain__check-custom" />
                <span>
                  Save my details in this browser for next time.
                </span>
              </label>

              <button className="ContactMain__btn" type="submit">
                <span className="ContactMain__btn-label">
                  Send Your Message
                </span>

                <span className="ContactMain__btn-arrow">
                  <ContactIcon type="arrow" />
                </span>
              </button>

              {sent && (
                <div className="ContactMain__success" role="status">
                  Thank you! Your message has been processed in this demo.
                  Connect your backend to receive actual submissions.
                </div>
              )}

              <p className="ContactMain__privacy">
                <ContactIcon type="lock" />
                Your information is treated with care.
              </p>
            </form>
          </div>

          {/* RIGHT: CONTACT INFORMATION */}
          <aside className="ContactMain__info">

            <div className="ContactMain__info-header">
              <span className="ContactMain__eyebrow">
                CONTACT DETAILS
                <span className="ContactMain__eyebrow-line" />
              </span>

              <h2 className="ContactMain__info-title">
                We'd Love to
                <br />
                <span>Hear From You.</span>
              </h2>

              <p className="ContactMain__info-description">
                Whether you need assistance or simply want to say hello,
                our team is ready to help.
              </p>
            </div>

            <div className="ContactMain__info-list">
              {contactItems.map((item, index) => (
                <article className="ContactMain__item" key={item.id}>
                  <div className="ContactMain__icon-box">
                    <ContactIcon type={item.icon} />
                  </div>

                  <div className="ContactMain__item-body">
                    <span className="ContactMain__item-eyebrow">
                      {item.eyebrow}
                    </span>

                    <h3 className="ContactMain__item-title">
                      {item.title}
                    </h3>

                    <p className="ContactMain__item-text">
                      {item.lines.map((line, i) => (
                        <React.Fragment key={line}>
                          {item.id === 'email' && i === 0 ? (
                            <a href={`mailto:${line}`}>{line}</a>
                          ) : item.id === 'phone' && i === 0 ? (
                            <a href={`tel:${line.replace(/\s/g, '')}`}>
                              {line}
                            </a>
                          ) : (
                            line
                          )}

                          {i < item.lines.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>

                  <span className="ContactMain__item-number">
                    0{index + 1}
                  </span>
                </article>
              ))}
            </div>

            {/* SOFT GREEN SUPPORT STRIP */}
            <div className="ContactMain__support">
              <div className="ContactMain__support-icon">
                <ContactIcon type="headset" />
              </div>

              <div className="ContactMain__support-text">
                <h4>Here when you need us</h4>
                <p>Reach out and let's plan your next step.</p>
              </div>

              <div className="ContactMain__support-divider" />

              <a
                className="ContactMain__support-plus"
                href={`mailto:${LOCATION.email}`}
                aria-label="Email our support team"
              >
                <ContactIcon type="plus" />
              </a>
            </div>

          </aside>
        </div>

        
       
        {/* MAP SECTION */}
        <section className="ContactMain__map-section">
          <div className="ContactMain__map-header">
            <div>
              <span className="ContactMain__eyebrow">
                FIND US HERE
                <span className="ContactMain__eyebrow-line" />
              </span>

              <h2 className="ContactMain__map-title">
                Our <span>Location</span>
              </h2>

              <p className="ContactMain__map-description">
                Find your way to us with our interactive location map.
              </p>
            </div>

            <a
              className="ContactMain__map-link"
              href={mapOpenUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
              <ContactIcon type="external" />
            </a>
          </div>

          {/* Map only — no overlay card */}
          <div className="ContactMain__map">
            <iframe
              className="ContactMain__map-frame"
              title={`Map showing ${LOCATION.name}`}
              src={mapEmbedUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Location information below the map */}
          <div className="ContactMain__map-details">
            <div className="ContactMain__map-details-icon">
              <ContactIcon type="location" />
            </div>

            <div className="ContactMain__map-details-content">
              <span className="ContactMain__map-label">
                OUR LOCATION
              </span>

              <h3>{LOCATION.name}</h3>

              <p>{LOCATION.address}</p>
            </div>

            <a
              className="ContactMain__directions"
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
              <ContactIcon type="arrow" />
            </a>
          </div>
        </section>


      </div>
    </section>
  )
}

export default ContactMain
