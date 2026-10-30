export default function About() {
    const milestones = [
        { year: "Experience", event: "Years of expertise in pharmaceutical machinery and spare parts." },
        { year: "Vision", event: "To deliver world-class pharma machinery and parts with innovation and trust." },
        { year: "Mission", event: "To support pharma companies worldwide with reliable, precise, and efficient engineering solutions." }
    ];

    const services = [
        { title: "Installation & Commissioning", desc: "Expert guidance to ensure smooth setup and operation." },
        { title: "Training Support", desc: "On-site and remote training for operators and technical teams." },
        { title: "Maintenance & Repairs", desc: "Quick response service to minimize downtime and keep production running." },
        { title: "Spare Parts Availability", desc: "Ready stock of critical components for timely replacements." },
        { title: "Annual Maintenance Contracts (AMC)", desc: "Comprehensive service plans for hassle-free operations." },
        { title: "24/7 Assistance", desc: "Our support team is always available to address queries and provide solutions." }
    ];

    const promises = [
        "World-class pharma machinery & spare parts",
        "Stringent quality checks and compliance with GMP standards",
        "Customizable solutions for every production need",
        "Reliable after-sales service and technical support"
    ];

    return (
        <div className="about-page">
            <section style={{
                position: 'relative',
                backgroundImage: `linear-gradient(135deg, rgba(2, 14, 33, 0.92) 0%, rgba(5, 30, 66, 0.86) 60%, rgba(0, 80, 140, 0.78) 100%), url("/images/pharma_hero_bg.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: 'white',
                padding: '8rem 0 5rem 0',
                overflow: 'visible'
            }}>
                {/* Subtle Ambient Radial Glow */}
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(0, 209, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
                    pointerEvents: 'none'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="about-hero-card" style={{
                        background: 'rgba(2, 20, 48, 0.65)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(0, 209, 255, 0.3)',
                        borderRadius: '28px',
                        padding: '4rem 3.5rem',
                        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {/* Status Badge */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'rgba(0, 209, 255, 0.12)',
                            border: '1px solid rgba(0, 209, 255, 0.4)',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '100px',
                            marginBottom: '2rem',
                            color: '#00D1FF',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            boxShadow: '0 0 20px rgba(0, 209, 255, 0.25)'
                        }}>
                            <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#00D1FF',
                                boxShadow: '0 0 10px #00D1FF'
                            }}></span>
                            Global Manufacturing Standards & Engineering
                        </div>

                        {/* Main Heading with High-Contrast Gradient */}
                        <h1 className="about-hero-title" style={{
                            fontSize: '3.75rem',
                            lineHeight: 1.15,
                            marginBottom: '1.75rem',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(135deg, #FFFFFF 40%, #00D1FF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))'
                        }}>
                            Welcome to Bhama Industries
                        </h1>

                        {/* Description Paragraph */}
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#e2e8f0',
                            maxWidth: '880px',
                            lineHeight: '1.9',
                            fontWeight: 400,
                            marginBottom: '3rem',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                        }}>
                            At Bhama Industries, we believe that precision and trust form the foundation of every successful partnership.
                            We are committed to delivering world-class solutions that ensure efficiency, reliability, and compliance with global standards.
                        </p>

                        {/* Highlight Feature Badges */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1.25rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.12)'
                        }}>
                            {[
                                { icon: "🛡️", title: "WHO-GMP Certified", desc: "Highest Safety Norms" },
                                { icon: "🌍", title: "30+ Countries", desc: "Global Export Reach" },
                                { icon: "⚙️", title: "Precision Built", desc: "High Speed & Low Downtime" },
                                { icon: "📞", title: "24/7 Support", desc: "Dedicated Field Engineers" }
                            ].map((badge, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    padding: '0.85rem 1.25rem',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}>
                                    <span style={{ fontSize: '1.5rem' }}>{badge.icon}</span>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>{badge.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{badge.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="container" style={{ padding: '6rem 0' }}>
                <div className="about-split-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '5rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ textAlign: 'left', marginBottom: '2.5rem' }}>About Our Excellence</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                            We are a trusted name in the pharmaceutical machinery and spare parts industry, delivering reliable,
                            high-precision solutions that empower manufacturers worldwide.
                        </p>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                            From complete production lines to specialized spare parts, we provide cost-effective, durable,
                            and efficient solutions tailored to the unique needs of pharmaceutical companies. Our expertise,
                            combined with advanced technology and strict quality control, ensures smooth operations.
                        </p>

                        <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '16px', borderLeft: '6px solid var(--accent)' }}>
                            <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.4rem' }}>Our Promise</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                {promises.map(item => (
                                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem', fontWeight: 600 }}>
                                        <span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>✔</span> {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <div style={{ background: 'var(--accent)', height: '100%', minHeight: '280px', borderRadius: '24px', position: 'absolute', top: '12px', left: '12px', width: '100%', zIndex: -1 }}></div>
                        <img
                            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80"
                            alt="Industrial Precision"
                            style={{ width: '100%', height: 'auto', minHeight: '280px', maxHeight: '450px', objectFit: 'cover', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', display: 'block' }}
                        />
                    </div>
                </div>
            </section>

            <section style={{ background: '#f1f5f9', padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ marginBottom: '1rem' }}>Comprehensive After-Sale Service</h2>
                        <p style={{ color: 'var(--text-muted)' }}>We are your long-term partner in growth and success.</p>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                        gap: '2.5rem'
                    }}>
                        {services.map((service, i) => (
                            <div key={i} style={{
                                padding: '2.5rem',
                                background: 'white',
                                borderRadius: '16px',
                                boxShadow: 'var(--shadow)',
                                transition: 'var(--transition)'
                            }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                <h4 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.2rem' }}>{service.title}</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container text-center" style={{ padding: '8rem 0' }}>
                <h2 style={{ marginBottom: '4rem' }}>Strategic Vision & Global Mission</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '3rem' }}>
                    <div style={{ padding: '4rem 3rem', background: 'var(--primary)', color: 'white', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                        <h3 style={{ color: 'var(--accent-light)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Our Vision</h3>
                        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', opacity: 0.9 }}>"To deliver world-class pharma machinery and parts with innovation and trust."</p>
                    </div>
                    <div style={{ padding: '4rem 3rem', background: 'var(--secondary)', color: 'white', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                        <h3 style={{ color: 'var(--accent-light)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Our Mission</h3>
                        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', opacity: 0.9 }}>"To support pharma companies worldwide with reliable, precise, and efficient engineering solutions."</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
