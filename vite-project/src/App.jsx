import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import AIChatbot from "./components/AIChatbot";
import MachineParts from "./components/MachineParts";

export default function App() {
  return (
    <div className="layout-wrapper">
      <main>
        <Hero />
        
        <section id="features" style={{ background: 'var(--surface-low)' }}>
          <div className="container">
            <div className="section-title-wrapper">
              <span className="section-label">One manufacturing partner</span>
              <h2 className="display-md">Complete systems for the pharma floor.</h2>
            </div>
            
            <div className="premium-grid">
              <div className="premium-card">
                <div className="icon-box">01</div>
                <h3>Clean by design</h3>
                <p style={{ color: 'var(--on-surface-muted)' }}>Thoughtful machine layouts and hygienic construction for demanding pharmaceutical environments.</p>
              </div>
              <div className="premium-card">
                <div className="icon-box">02</div>
                <h3>Accurate output</h3>
                <p style={{ color: 'var(--on-surface-muted)' }}>Reliable dosing, sealing, inspection and labelling to keep your production consistent.</p>
              </div>
              <div className="premium-card">
                <div className="icon-box">03</div>
                <h3>Support that stays</h3>
                <p style={{ color: 'var(--on-surface-muted)' }}>From installation and training to spares and service, we remain close to your line.</p>
              </div>
            </div>
          </div>
        </section>

        <WhyUs />
        <MachineParts />

        <section id="support" className="container">
          <div className="cta-section">
            <span className="section-label" style={{ color: 'var(--accent)' }}>Dedicated Support</span>
            <h2 className="display-md">Unmatched After-Sale Partnership</h2>
            <p style={{ maxWidth: '800px', margin: '2rem auto 4rem', fontSize: '1.25rem', opacity: 0.8 }}>
              Our relationship with clients goes beyond the delivery of machines. We build long-term 
              partnerships through dedicated, expert support available worldwide.
            </p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {["Installation", "Operator Training", "24/7 Assistance", "Annual Contracts"].map(item => (
                <div key={item} style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '1rem 2.5rem',
                  borderRadius: '100px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.05em'
                }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AIChatbot />
    </div>
  );
}