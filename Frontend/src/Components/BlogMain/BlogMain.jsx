import React, { useMemo, useState } from "react";
import "./BlogMain.css";

const POSTS = [
  {
    id: 1,
    category: "Crocodiles",
    date: "12 Oct 2026",
    comments: 4,
    title: "Meet the Giants of Bhitarkanika: Saltwater Crocodiles",
    excerpt:
      "Explore the muddy banks and winding mangrove creeks where mighty saltwater crocodiles bask in the warm afternoon sun.",
    place: "Dangmal Creek",
    season: "Nov – Feb",
    image:
      "https://images.squarespace-cdn.com/content/v1/552ce6d0e4b0d3f184888632/1439705415659-VQJQ7HYKF6J9RKBDYTON/5D3_9150.jpg",
    imageAlt: "Saltwater crocodile resting on a muddy riverbank in Bhitarkanika",
    link: "#",
  },
  {
    id: 2,
    category: "Turtles",
    date: "28 Sep 2026",
    comments: 9,
    title: "Olive Ridley Turtles Return to Gahirmatha Beach",
    excerpt:
      "Discover the remarkable Olive Ridley sea turtles and the world-renowned nesting sanctuaries lining the coastal shores of Odisha.",
    place: "Gahirmatha Coast",
    season: "Nesting Season",
    image:
      "https://res.cloudinary.com/roundglass/image/upload/f_auto/v1584218805/roundglass/sustain/Odisha_Olive-ridley_Kartik-Shanker-copy_ze1jx0.jpg",
    imageAlt: "Olive Ridley sea turtles gathering on an Odisha nesting beach",
    link: "#",
  },
  {
    id: 3,
    category: "Birds",
    date: "17 Sep 2026",
    comments: 2,
    title: "Bagagahana: A Heronry Alive With Egrets and Storks",
    excerpt:
      "Witness vibrant nesting colonies of egrets, painted storks, and darters canopying the quiet mangrove channels.",
    place: "Bagagahana Heronry",
    season: "Jul – Oct",
    image:
      "https://miro.medium.com/v2/resize%3Afit%3A1200/0%2A6UWbJD-wqfPe4MXk.jpg",
    imageAlt: "A large colony of nesting waterbirds among Bhitarkanika mangroves",
    link: "#",
  },
  {
    id: 4,
    category: "Reptiles",
    date: "05 Aug 2026",
    comments: 6,
    title: "Discover the Water Monitor of the Mangrove Forest",
    excerpt:
      "Learn about the mighty Asian water monitor lizard and the varied reptiles thriving beneath tidal aerial root systems.",
    place: "Mangrove Interior",
    season: "Oct – Mar",
    image:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Wild reptile in a natural habitat",
    link: "#",
  },
  {
    id: 5,
    category: "Mammals",
    date: "22 Jul 2026",
    comments: 3,
    title: "Spotted Deer at Dawn in the Bhitarkanika Mangroves",
    excerpt:
      "Watch graceful spotted deer graze along the shoreline mist, offering quiet glimpses into undisturbed wildlife sanctuary life.",
    place: "Dangmal Sanctuary",
    season: "Early Morning",
    image:
      "https://apps.odishatourism.gov.in/Application/uploadDocuments/UserContribution/user20200130121601619",
    imageAlt: "Spotted deer standing among the green mangrove vegetation",
    link: "#",
  },
  {
    id: 6,
    category: "Birds",
    date: "09 Jul 2026",
    comments: 7,
    title: "Kingfishers on the Water: A Boat Safari Birding Guide",
    excerpt:
      "Spot eight varieties of brilliant kingfishers perched above the waterways, making Bhitarkanika an unmatched birdwatcher's haven.",
    place: "Khola Jetty Trails",
    season: "Year Round",
    image:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Colorful wild bird perched in its natural environment",
    link: "#",
  },
];

const FILTERS = ["All", "Crocodiles", "Birds", "Turtles", "Reptiles", "Mammals"];
const PETALS = [0, 1, 2, 3, 4, 5, 6, 7];

const BlogMain = () => {
  const [active, setActive] = useState("All");
  const [failedImages, setFailedImages] = useState([]);

  const visiblePosts = useMemo(
    () =>
      active === "All"
        ? POSTS
        : POSTS.filter((post) => post.category === active),
    [active]
  );

  const handleImageError = (id) => {
    setFailedImages((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  };

  return (
    <section className="BlogMain" aria-labelledby="BlogMain-heading">
      <div className="BlogMain__container">
        
        {/* Header */}
        <header className="BlogMain__header">
          <div className="BlogMain__headerText">
            <span className="BlogMain__eyebrow">
              <span className="BlogMain__eyebrowLine" />
              WILDLIFE JOURNAL
              <span className="BlogMain__eyebrowLine" />
            </span>

            <h2 className="BlogMain__heading" id="BlogMain-heading">
              Field Notes from <span>Bhitarkanika</span>
            </h2>

            <p className="BlogMain__subheading">
              Chronicles of estuarine crocodiles, sea turtles, rare kingfishers, and the timeless mangrove ecosystems of coastal Odisha.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            className="BlogMain__filters"
            role="group"
            aria-label="Filter wildlife stories"
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`BlogMain__filter ${
                  active === filter ? "BlogMain__filter--active" : ""
                }`}
                aria-pressed={active === filter}
                onClick={() => setActive(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        {/* Results Bar */}
        <div className="BlogMain__resultLine">
          <span>
            Showing <strong>{visiblePosts.length}</strong> wildlife stories
          </span>
          <span className="BlogMain__resultDot" />
          <span>Tales from India's second-largest mangrove sanctuary</span>
        </div>

        {/* Story Grid */}
        <div className="BlogMain__grid">
          {visiblePosts.map((post) => (
            <article className="BlogMain__card" key={post.id}>
              
              {/* Media Wrap */}
              <div className="BlogMain__media">
                {!failedImages.includes(post.id) ? (
                  <img
                    className="BlogMain__image"
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    decoding="async"
                    onError={() => handleImageError(post.id)}
                  />
                ) : (
                  <div
                    className="BlogMain__imageFallback"
                    role="img"
                    aria-label={`${post.category} image unavailable`}
                  >
                    <span>{post.category}</span>
                    <small>Bhitarkanika Sanctuary</small>
                  </div>
                )}

                <div className="BlogMain__imageShade" />
                <span className="BlogMain__tag">{post.category}</span>
                <span className="BlogMain__imageNumber">0{post.id}</span>
              </div>

              {/* Card Body */}
              <div className="BlogMain__body">
                {/* Micro Botanical Bud Emblem */}
                <span className="BlogMain__bud" aria-hidden="true">
                  {PETALS.map((index) => (
                    <span
                      className="BlogMain__petal"
                      style={{ "--i": index }}
                      key={index}
                    />
                  ))}
                </span>

                <div className="BlogMain__meta">
                  <span className="BlogMain__date">{post.date}</span>
                  <span className="BlogMain__dot" aria-hidden="true" />
                  <span className="BlogMain__comments">
                    {post.comments} Comments
                  </span>
                </div>

                <h3 className="BlogMain__title">
                  <a className="BlogMain__titleLink" href={post.link}>
                    {post.title}
                  </a>
                </h3>

                <span className="BlogMain__more">
                  Explore story
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>

                {/* Animated Botanical Bloom Layer */}
                <div className="BlogMain__bloom">
                  <span className="BlogMain__bloomFlower" aria-hidden="true">
                    {PETALS.map((index) => (
                      <span
                        className="BlogMain__bloomPetal"
                        style={{ "--i": index }}
                        key={index}
                      />
                    ))}
                  </span>

                  <p className="BlogMain__excerpt">{post.excerpt}</p>

                  <dl className="BlogMain__facts">
                    <div className="BlogMain__fact">
                      <dt className="BlogMain__factLabel">Location</dt>
                      <dd className="BlogMain__factValue">{post.place}</dd>
                    </div>

                    <div className="BlogMain__fact">
                      <dt className="BlogMain__factLabel">Ideal Season</dt>
                      <dd className="BlogMain__factValue">{post.season}</dd>
                    </div>
                  </dl>

                  <a className="BlogMain__button" href={post.link}>
                    <span>Read Full Story</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visiblePosts.length === 0 && (
          <div className="BlogMain__empty">
            <p>No journal entries found in this category.</p>
          </div>
        )}

        {/* Section Footer */}
        <footer className="BlogMain__footer">
          <span className="BlogMain__footerLine" />
          <p>Every creek has a story. Every creature has a sanctuary.</p>
          <span className="BlogMain__footerLine" />
        </footer>

      </div>
    </section>
  );
};

export default BlogMain;