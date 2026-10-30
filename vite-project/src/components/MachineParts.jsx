import { useState } from "react";

export default function MachineParts() {
    const [selectedPart, setSelectedPart] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const parts = [
        {
            name: "Worm & Gears",
            desc: "High-precision drive components for quiet operation.",
            material: "Phosphorus Bronze",
            usage: "Main Drive Transmission",
            image: "/images/worm_gears_premium.png"
        },
        {
            name: "Filling Nozzles",
            desc: "Anti-drip SS 316L nozzles for precise liquid dosing.",
            material: "SS 316L (Food Grade)",
            usage: "Liquid Filling Systems",
            image: "/images/filling_nozzles_premium.png"
        },
        {
            name: "Capping Heads",
            desc: "Magnetic torque control heads for consistent sealing.",
            material: "Stainless Steel 304",
            usage: "Automatic Capping",
            image: "/images/capping_heads_premium.png"
        },
        {
            name: "Star Wheels",
            desc: "Customized low-friction parts for smooth bottle handling.",
            material: "Nylon / UHMW",
            usage: "Bottle Transport",
            image: "/images/star_wheels_premium.png"
        }
    ];

    const handleDragStart = (e, part) => {
        e.dataTransfer.setData("partName", part.name);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const partName = e.dataTransfer.getData("partName");
        const part = parts.find(p => p.name === partName);
        if (part) setSelectedPart(part);
        setDragOver(false);
    };

    return (
        <section id="machines" style={{ background: 'var(--surface)', padding: '10rem 0' }}>
            <div className="container">
                <div className="section-title-wrapper" style={{ textAlign: 'center' }}>
                    <span className="section-label">Technical Explorer</span>
                    <h2 className="display-md">Machine Specification Analyzer</h2>
                    <p style={{ color: 'var(--on-surface-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '2rem auto' }}>
                        Drag a component or click to view detailed technical specifications and material standards.
                    </p>
                </div>

                <div className="machine-parts-grid" style={{ alignItems: 'start', marginTop: '6rem' }}>
                    {/* Left: Components Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {parts.map((p, i) => (
                            <div
                                key={i}
                                draggable
                                onDragStart={(e) => handleDragStart(e, p)}
                                onClick={() => setSelectedPart(p)}
                                className="premium-card"
                                style={{
                                    padding: '1.5rem',
                                    cursor: 'grab',
                                    border: selectedPart?.name === p.name ? '2px solid var(--accent)' : '2px solid transparent',
                                    boxShadow: selectedPart?.name === p.name ? 'var(--shadow-premium)' : 'none'
                                }}
                            >
                                <img src={p.image} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '1rem', marginBottom: '1.5rem' }} alt={p.name} />
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{p.name}</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-muted)', margin: 0 }}>{p.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right: Analyzer Zone */}
                    <div
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        style={{
                            background: dragOver ? 'rgba(0, 209, 255, 0.05)' : 'var(--surface-lowest)',
                            padding: '4rem',
                            borderRadius: '2rem',
                            border: dragOver ? '2px dashed var(--accent)' : '1px solid rgba(0,0,0,0.05)',
                            minHeight: '600px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: selectedPart ? 'flex-start' : 'center',
                            textAlign: 'center',
                            transition: 'var(--transition)',
                            position: 'sticky',
                            top: '120px',
                            boxShadow: 'var(--shadow-premium)'
                        }}
                    >
                        {!selectedPart ? (
                            <div className="animate-in" style={{ opacity: 0.6 }}>
                                <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🔍</div>
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Select a Part</h3>
                                <p style={{ fontSize: '1rem' }}>Drag a component here <br />for deep technical analysis</p>
                            </div>
                        ) : (
                            <div className="animate-in" style={{ width: '100%', textAlign: 'left' }}>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '3rem' }}>
                                    <img src={selectedPart.image} style={{ width: '80px', height: '80px', borderRadius: '1rem', objectFit: 'cover' }} alt={selectedPart.name} />
                                    <div>
                                        <h3 style={{ fontSize: '1.75rem', margin: 0 }}>{selectedPart.name}</h3>
                                        <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Technical Specs</p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
                                    <div style={{ background: 'var(--surface-low)', padding: '1.5rem', borderRadius: '1rem' }}>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--on-surface-muted)', margin: '0 0 8px 0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Material Composition</p>
                                        <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{selectedPart.material}</p>
                                    </div>
                                    <div style={{ background: 'var(--surface-low)', padding: '1.5rem', borderRadius: '1rem' }}>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--on-surface-muted)', margin: '0 0 8px 0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary Application</p>
                                        <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{selectedPart.usage}</p>
                                    </div>
                                </div>

                                <div style={{ background: 'var(--primary)', padding: '2rem', borderRadius: '1.5rem', color: 'white', position: 'relative' }}>
                                    <h4 style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Technical Integrity</h4>
                                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.7', opacity: 0.9 }}>
                                        Precision-machined using CNC technology to ensure zero-vibration performance and extended service life in pharmaceutical-grade continuous operation environments.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setSelectedPart(null)}
                                    style={{ marginTop: '3rem', background: 'none', border: 'none', color: 'var(--on-surface-muted)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
                                >Close Analysis</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
