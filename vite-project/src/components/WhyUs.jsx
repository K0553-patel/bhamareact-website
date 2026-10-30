export default function WhyUs() {
  const points = [
    {
      title: "Quality Engineering",
      desc: "Every product undergoes strict multi-stage quality checks to ensure flawless high-speed performance in clean-room environments."
    },
    {
      title: "Full-Spectrum Solutions",
      desc: "From advanced rotary tablet presses to critical precision-machined spare parts, we offer complete pharma engineering under one roof."
    },
    {
      title: "Design for Efficiency",
      desc: "We understand your challenges and provide tailor-made, ergonomic solutions to enhance output and reduce maintenance downtime."
    },
    {
      title: "Global Compliance",
      desc: "Our products exceed WHO-GMP and international safety norms, building long-term trust with major pharmaceutical groups worldwide."
    },
    {
      title: "Innovation Hub",
      desc: "Bhama Industries continuously invests in R&D to pioneer high-speed manufacturing technologies for the future."
    }
  ];

  return (
    <section className="why-us" id="about">
      <div className="container">
        <div className="section-title-wrapper" style={{ textAlign: 'center' }}>
          <span className="section-label">Our Core Values</span>
          <h2 className="display-md">Built for Reliability</h2>
          <p style={{ color: 'var(--on-surface-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '2rem auto' }}>
            Innovation that delivers excellence — we go beyond machinery to provide long-term technological stability.
          </p>
        </div>

        <div className="premium-grid" style={{ marginTop: '8rem' }}>
          {points.map((p, i) => (
            <div key={i} className="premium-card">
              <div className="icon-box" style={{ background: 'var(--primary)', color: 'var(--accent)', fontWeight: 800 }}>
                {i + 1}
              </div>
              <h3>{p.title}</h3>
              <p style={{ color: 'var(--on-surface-muted)', lineHeight: '1.8' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
