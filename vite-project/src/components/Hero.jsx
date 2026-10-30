import { Link } from "react-router-dom";

const highlights = [
  { value: "01", label: "Washing & cleaning" },
  { value: "02", label: "Filling & sealing" },
  { value: "03", label: "Inspection & labelling" }
];

export default function Hero() {
  return (
    <section className="hero landing-hero">
      <div className="hero-grid-glow" aria-hidden="true" />
      <div className="container hero-container">
        <div className="hero-content animate-in">
          <div className="hero-kicker">
            <span className="hero-kicker-dot" />
            Pharmaceutical machinery manufacturer
          </div>
          <h1 className="display-lg">
            Precision built for
            <span className="hero-gradient-text"> better production.</span>
          </h1>
          <p className="hero-intro">
            Bhama Industries designs and manufactures dependable machinery for
            pharmaceutical washing, filling, sealing, inspection, labelling
            and material handling.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-accent">
              Explore machinery <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/contact" className="hero-secondary-link">
              Talk to an engineer <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="hero-proof">
            {highlights.map((item) => (
              <div className="hero-proof-item" key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-image-wrapper animate-in">
          <div className="hero-machine-card">
            <div className="hero-machine-topline">
              <span>BHAMA / ENGINEERED SYSTEMS</span>
              <span className="hero-status"><i /> Ready for enquiry</span>
            </div>
            <img
              src="/images/pharma_hero_bg.png"
              alt="Pharmaceutical production machinery"
            />
            <div className="hero-machine-caption">
              <div>
                <span className="section-label">Production equipment</span>
                <h2>Built around your process.</h2>
              </div>
              <span className="hero-arrow" aria-hidden="true">↗</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-note" aria-hidden="true">
        <span>Scroll to explore</span><i />
      </div>
    </section>
  );
}
