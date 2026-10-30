import { useState } from "react";

const API_URL = `http://${window.location.hostname}:5000/api`;

export default function Products() {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", name: "All Solutions" },
    { id: "washing", name: "Washing Systems" },
    { id: "filling", name: "Filling & Dosing" },
    { id: "sealing", name: "Sealing & Capping" },
    { id: "inspection", name: "Inspection" },
    { id: "labelling", name: "Labelling" },
    { id: "handling", name: "Handling" },
    { id: "parts", name: "Machine Parts" }
  ];

  const products = [
    // Washing Section (Page 4-5)
    {
      category: "washing",
      name: "Automatic Rotary Vial Washing Machine",
      desc: "Multi-stage spray & rinse system for thorough internal/external cleaning.",
      specs: { range: "2 ml – 1 L", build: "SS 304/316", system: "Rotary Spray", type: "Automatic", utilities: "Water & Air (4-6 Bar)" },
      image: "/images/rotary_washing_premium.png"
    },
    {
      category: "washing",
      name: "Linear Vial Washing Machine",
      desc: "High-speed linear unit with modular washing cycles.",
      specs: { range: "Customizable", build: "SS 304/316", system: "Continuous Linear", type: "Automatic" },
      image: "/images/linear_washing_premium.png"
    },
    {
      category: "washing",
      name: "External Bottle Washing Machine",
      desc: "Specialized for external surface cleaning before labelling/packaging.",
      specs: { range: "Up to 500ml", system: "High-pressure jets" },
      image: "/images/external_bottle_washing_v2.png"
    },

    // Filling Section (Page 6-8)
    {
      category: "filling",
      name: "Ampoule Filling & Sealing Machine",
      desc: "Precision filling system for glass ampoules with integrated flame sealing.",
      specs: { range: "1 ml – 30 ml", system: "Volumetric/Piston", power: "230/415V", air: "4-6 Bar" },
      image: "/images/ampoule_filling_premium.png"
    },
    {
      category: "filling",
      name: "Injectable Liquid Filling Machine",
      desc: "Designed for high-accuracy hygienic dosing of injectable liquids into vials.",
      specs: { build: "SS 316L Contact Parts", system: "Servo-based", accuracy: "+/- 0.5%" },
      image: "/images/injectable_liquid_filling_v2.png"

    },
    {
      category: "filling",
      name: "Dry Syrup Powder Filling Machine",
      desc: "Vacuum-based powder filling for accurate dosage in dry syrup production.",
      specs: { type: "Rotary/Linear", system: "Auger/Vacuum" },
      image: "/images/dry_syrup_powder_v2.png"
    },
    {
      category: "filling",
      name: "Vial Filling and Stoppering Machine",
      desc: "Combination unit for precise liquid filling followed by automatic rubber stoppering.",
      specs: { system: "Piston/Servo", stoppering: "Vibratory bowl feeder" },
      image: "/images/injectable_liquid_filling_v2.png"
    },

    // Sealing & Capping (Page 9-10 & 13-15)
    {
      category: "sealing",
      name: "Flip-off Cap Sealing Machine",
      desc: "High-speed cap sealing for pharmaceutical glass vials.",
      specs: { system: "Pneumatic/Rotary", build: "SS 304/316", range: "2 ml - 100 ml" },
      image: "/images/flip of cap.png"
    },
    {
      category: "sealing",
      name: "ROPP Capping Machine",
      desc: "Automatic capping system for metalized roll-on pilfer-proof caps.",
      specs: { type: "Automatic", speed: "Variable", power: "230/415V" },
      image: "/images/ropp_capping_premium.png"
    },
    {
      category: "sealing",
      name: "Aluminium Cap Sealing Machine",
      desc: "Dedicated unit for aluminium seal application on parenteral vials.",
      specs: { system: "Rotary", air: "4-6 Bar" },
      image: "/images/aluminium_cap_sealing_premium.png"
    },

    // Inspection (Page 11-12)
    {
      category: "inspection",
      name: "Automatic Ampoule Inspection Machine",
      desc: "Advanced visual system for detecting particles and fill level defects.",
      specs: { system: "Integrated Lighting", type: "Semi/Automatic", range: "1 ml - 30 ml" },
      image: "/images/ampoule_inspection_premium.png"
    },
    {
      category: "inspection",
      name: "Automatic Vial Inspection Machine",
      desc: "High-fidelity inspection for cosmetic flaws and content purity.",
      specs: { system: "Optical Sensors", build: "SS 304" },
      image: "/images/vial_inspection_premium.png"
    },

    // Labelling (Page 16-18)
    {
      category: "labelling",
      name: "Sticker Labelling Machine (Wrap-around)",
      desc: "Full wrap-around sticker application for glass and plastic bottles.",
      specs: { system: "High-precision stepper", range: "2 ml - 1 L", accuracy: "+/- 1mm" },
      image: "/images/labelling_premium.png"
    },
    {
      category: "labelling",
      name: "Self-Adhesive Ampoule Labelling",
      desc: "Dedicated high-speed unit designed specifically for glass ampoules.",
      specs: { type: "Automatic", build: "GMP Compliant" },
      image: "/images/self.png"
    },

    // Handling (Page 19-21)
    {
      category: "handling",
      name: "Industrial Conveyor System",
      desc: "Modular food-grade conveyor systems for seamless machine integration.",
      specs: { build: "SS 304/316", length: "Customizable", belt: "Food-grade PU/Modular" },
      image: "/images/conveyor_system.png"
    },
    {
      category: "handling",
      name: "Turntable Feeding Machine",
      desc: "Variable-speed rotary table for smooth bottle feeding and collection.",
      specs: { diameter: "600 mm - 1200 mm", power: "230V/415V", build: "SS 304" },
      image: "/images/turntable_machine.png"
    },
    // Machine Parts Section
    {
      category: "parts",
      name: "Industrial Control Motor",
      desc: "High-torque AC/DC control motors for precise speed regulation in pharmaceutical production lines.",
      specs: { type: "AC Control", power: "0.5 HP - 2 HP", build: "Aluminum/Steel Body" },
      image: "/images/motor_premium.png"
    },
    {
      category: "parts",
      name: "Drive Timing Motor",
      desc: "Synchronous timing motors for accurate machine indexing and multi-stage production control.",
      specs: { system: "Step Control", torque: "High", application: "Indexing Lines" },
      image: "/images/motor2_premium.png"
    },
    {
      category: "parts",
      name: "Heavy-Duty Gear Motor",
      desc: "Robust gear-driven motors for conveyors and heavy machinery handling systems.",
      specs: { ratio: "Variable", brand: "Industrial Grade", use: "Conveyors & Elevators" },
      image: "/images/motor2_premium.png"
    },
    {
      category: "parts",
      name: "Precision Machine Parts Kit",
      desc: "Comprehensive spare parts kit including nozzles, syringes, and specialized drive gears.",
      specs: { material: "SS 316L / Nylon", certification: "Who-GMP", kitType: "Maintenence Kit" },
      image: "/images/parts_premium.png"
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = activeTab === "all" ? products : products.filter(p => p.category === activeTab);

  return (
    <section style={{ padding: '6rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>Machine Catalogue</h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--accent)', margin: '0 auto 2rem' }}></div>
          <p style={{ color: 'var(--text-muted)', maxWidth: '800px', marginInline: 'auto', fontSize: '1.1rem' }}>
            Comprehensive pharma packaging solutions tailored to global industrial standards.
            All machinery is built with SS 304/316 and complies with WHO-GMP norms.
          </p>
        </div>

        {/* Interactive Analyzer Hub */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '5rem',
          border: '1px solid #f1f5f9',
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '2rem',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.background = 'rgba(201, 150, 31, 0.1)'; }}
            onDragLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.style.background = '#f8fafc';
              const name = e.dataTransfer.getData("prodName");
              const prod = products.find(p => p.name === name);
              if (prod) setSelectedProduct(prod);
            }}
            style={{
              height: '300px',
              background: '#f8fafc',
              borderRadius: '20px',
              border: '2px dashed var(--accent)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📥</div>
            <h4 style={{ color: 'var(--primary)', margin: 0 }}>Analyzer Zone</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '0 1rem' }}>Drag any machine below here to see its parts & specs</p>
          </div>

          <div style={{ padding: '1rem' }}>
            {selectedProduct ? (
              <div style={{ animation: 'fadeIn 0.5s ease' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <img src={selectedProduct.image} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} alt="" />
                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', margin: 0 }}>{selectedProduct.name}</h3>
                    <span style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.7rem' }}>ANALYZING ENGINEERING SPECS...</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '10px' }}>
                    <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: '0 0 4px 0' }}>MATERIAL BASE</p>
                    <p style={{ fontWeight: 600, fontSize: '0.85rem', margin: 0 }}>{selectedProduct.specs.build || 'SS 316L / SS 304'}</p>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '10px' }}>
                    <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: '0 0 4px 0' }}>CONTROL SYSTEM</p>
                    <p style={{ fontWeight: 600, fontSize: '0.85rem', margin: 0 }}>{selectedProduct.specs.system || 'PLC / Servo'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  style={{ marginTop: '1rem', background: 'var(--primary)', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}
                >Analyze Another Machine</button>
              </div>
            ) : (
              <>
                <span style={{
                  background: 'var(--accent)',
                  color: 'white',
                  fontSize: '0.7rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '50px',
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}>Technical Hub</span>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)', margin: '10px 0' }}>Engineering Explorer</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Use our interactive tracker to see the specific engineering materials and parts used
                  in each machine. Drag a machine or click its title to begin the scan.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>SS 316L Components</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Precision Motors</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '4rem',
          flexWrap: 'wrap',
          background: 'white',
          padding: '1rem',
          borderRadius: '50px',
          boxShadow: 'var(--shadow)',
          width: 'fit-content',
          marginInline: 'auto'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '30px',
                border: 'none',
                background: activeTab === cat.id ? 'var(--primary)' : 'transparent',
                color: activeTab === cat.id ? 'white' : 'var(--text-muted)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'var(--transition)'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid View */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {filteredProducts.map((p, i) => (
            <div key={i}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("prodName", p.name);
                e.currentTarget.style.opacity = '0.5';
              }}
              onDragEnd={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onClick={() => setSelectedProduct(p)}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow)',
                border: '1px solid rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'var(--transition)',
                cursor: 'pointer'
              }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>

              <div style={{ height: '260px', overflow: 'hidden', position: 'relative', background: p.image ? 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onError={(e) => { e.target.style.objectFit = 'contain'; e.target.style.padding = '1rem'; e.target.parentElement.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)'; }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--primary)', opacity: 0.5 }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚙️</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Precision Part</div>
                  </div>
                )}

                {/* Category Badge - top right */}
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'rgba(201,150,31,0.92)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  backdropFilter: 'blur(4px)'
                }}>
                  {p.category}
                </div>

                {/* Machine Name Label - bottom gradient overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,20,50,0.95) 0%, rgba(0,20,50,0.7) 60%, transparent 100%)',
                  padding: '2rem 1.25rem 1rem',
                  display: 'flex',
                  alignItems: 'flex-end'
                }}>
                  <h4 style={{
                    color: 'white',
                    margin: 0,
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    lineHeight: '1.3',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                    letterSpacing: '0.2px'
                  }}>
                    {p.name}
                  </h4>
                </div>
              </div>

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.75rem' }}>{p.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{p.desc}</p>

                <div style={{ marginTop: 'auto', background: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 800 }}>Key Specifications</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4px' }}>
                    {Object.entries(p.specs).slice(0, 3).map(([key, val]) => (
                      <div key={key} style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{key}:</span> {val}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-primary" style={{ flex: 1, padding: '0.75rem', fontSize: '0.85rem' }}>Get Quote</button>
                  <button className="btn btn-outline" style={{ flex: 1, padding: '0.75rem', fontSize: '0.85rem' }}>Full Specs</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProduct && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }} onClick={() => setSelectedProduct(null)}>
            <div style={{
              background: 'white',
              maxWidth: '1000px',
              width: '100%',
              borderRadius: '30px',
              overflow: 'hidden',
              display: 'flex',
              position: 'relative',
              animation: 'modalFade 0.3s ease-out'
            }} onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'white',
                  border: 'none',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  zIndex: 10
                }}>&times;</button>

              <div style={{ width: '45%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {selectedProduct.image ? (
                  <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--primary)', opacity: 0.3 }}>
                    <div style={{ fontSize: '6rem' }}>⚙️</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>PRECISION SPARE PART</div>
                  </div>
                )}
              </div>

              <div style={{ width: '55%', padding: '3rem' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem' }}>{selectedProduct.category}</span>
                <h2 style={{ fontSize: '2.2rem', color: 'var(--primary)', margin: '10px 0 20px' }}>{selectedProduct.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2.5rem' }}>{selectedProduct.desc}</p>

                <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '2px solid var(--accent)', display: 'inline-block' }}>Technical Specifications</h4>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {Object.entries(selectedProduct.specs).map(([key, val]) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #edf2f7', paddingBottom: '8px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--primary)', textTransform: 'capitalize' }}>{key}</span>
                        <span style={{ color: 'var(--text-main)' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '1rem' }}
                    onClick={async () => {
                      const name = prompt("Please enter your name:");
                      const phone = prompt("Please enter your phone number:");
                      if (name && phone) {
                        try {
                          const res = await fetch(`${API_URL}/enquiries`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              name,
                              phone,
                              email: 'direct_inquiry@bhama.com',
                              message: `Inquiry for ${selectedProduct.name}`,
                              product: selectedProduct._id,
                              type: 'product'
                            })
                          });
                          const data = await res.json();
                          alert(data.message || "Welcome to Bhama Industries!");
                        } catch (e) {
                          alert("Submission failed. Please try again.");
                        }
                      }
                    }}
                  >Enquire Now</button>
                  <a href={`https://wa.me/919558483100?text=I'm interested in ${selectedProduct.name}`} target="_blank" className="btn btn-outline" style={{ flex: 1, padding: '1rem', textDecoration: 'none' }}>WhatsApp Details</a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{
          marginTop: '6rem',
          background: 'var(--primary)',
          padding: '4rem',
          borderRadius: '24px',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-light)' }}>Looking for custom engineering?</h2>
          <p style={{ maxWidth: '600px', marginInline: 'auto', fontSize: '1.1rem', opacity: 0.9, marginBottom: '2.5rem' }}>
            Our engineering team can design and build specialized machinery tailored precisely to your production facility requirements.
          </p>
          <a href="/contact" className="btn btn-primary" style={{ background: 'var(--accent)', borderColor: 'var(--accent)', padding: '1rem 2.5rem' }}>Contact Technical Team</a>
        </div>
      </div>
      <style>{`
        @keyframes modalFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
