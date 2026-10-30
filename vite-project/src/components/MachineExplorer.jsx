import React, { useState } from 'react';

const partsData = [
    {
        id: 'nozzle',
        name: 'Filling Nozzle',
        material: 'SS 316L (Pharmaceutical Grade)',
        usage: 'Automatic Liquid Filling Machines',
        features: 'Anti-drip design, precision bore, electropolished finish',
        description: 'High-precision nozzles designed for sterile liquid filling. Features a specialized tip to prevent dripping and ensure accurate volume delivery.',
        image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=300&q=80'
    },
    {
        id: 'starwheel',
        name: 'Star Wheel',
        material: 'Nylon / UHMW / Delrin',
        usage: 'Bottle Transport & Handling',
        features: 'Low friction, custom profile, quick-change compatibility',
        description: 'Custom-engineered star wheels for smooth container handling. Designed to minimize noise and prevent container damage during high-speed operation.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=300&q=80'
    },
    {
        id: 'gear',
        name: 'Worm & Gears',
        material: 'Phosphorus Bronze & Case Hardened Steel',
        usage: 'Main Drive Transmission',
        features: 'High torque capacity, low backlash, long service life',
        description: 'Extremely durable gear sets for synchronized machine timing. Manufactured with precision to ensure vibration-free transmission and high efficiency.',
        image: 'https://images.unsplash.com/photo-1540104443314-12403666fe5b?auto=format&fit=crop&w=300&q=80'
    },
    {
        id: 'roller',
        name: 'Sealing Roller',
        material: 'High Carbon High Chromium (HCHC) Steel',
        usage: 'ROPP / Screw Capping Machines',
        features: 'Induction hardened, precision ground, mirror finish',
        description: 'Precision rollers for cap sealing. Ensures perfect threading and airtight sealing for pharmaceutical bottles.',
        image: 'https://images.unsplash.com/photo-1504194104404-433180773017?auto=format&fit=crop&w=300&q=80'
    },
    {
        id: 'belt',
        name: 'Conveyor Belt',
        material: 'Food Grade PVC / Modular Plastic',
        usage: 'In-feed and Out-feed Lines',
        features: 'Anti-static, heat resistant, easy to clean',
        description: 'Modular belt systems designed for pharmaceutical environments. GMP compliant materials with easy-to-clean structures.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80'
    },
    {
        id: 'capping',
        name: 'Capping Head',
        material: 'Stainless Steel 304 / 316',
        usage: 'Automatic Capping Machines',
        features: 'Magnetic torque control, long-life springs, adjustable pressure',
        description: 'Precision-engineered capping heads to ensure uniform torque application on all types of containers and caps.',
        image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=300&q=80'
    },
    {
        id: 'heater',
        name: 'Heating Element',
        material: 'Nichrome Alloy / SS 304 Casing',
        usage: 'Sealing and Shrink Wrapping',
        features: 'Rapid heating, even temperature distribution, durable',
        description: 'High-quality heating elements for consistent sealing results in packaging processes.',
        image: 'https://images.unsplash.com/photo-1540104443314-12403666fe5b?auto=format&fit=crop&w=300&q=80'
    }
];

export default function MachineExplorer() {
    const [selectedPart, setSelectedPart] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragover, setDragover] = useState(false);

    const handleDragStart = (e, part) => {
        e.dataTransfer.setData('partId', part.id);
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setDragover(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const partId = e.dataTransfer.getData('partId');
        const part = partsData.find(p => p.id === partId);
        if (part) {
            setSelectedPart(part);
        }
        setDragover(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragover(true);
    };

    return (
        <div className="machine-explorer" style={{
            background: 'white',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: 'var(--shadow-lg)',
            margin: '2rem 0',
            border: '1px solid #f1f5f9'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>Interactive Machine Explorer</h2>
                <p style={{ color: 'var(--text-muted)' }}>Drag a machine part to the Analyzer or click to see its technical specifications.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', minHeight: '500px' }}>
                {/* Left Side: Part Selection */}
                <div style={{ padding: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>Available Parts</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
                        {partsData.map(part => (
                            <div
                                key={part.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, part)}
                                onDragEnd={handleDragEnd}
                                onClick={() => setSelectedPart(part)}
                                style={{
                                    background: '#f8fafc',
                                    padding: '1rem',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    cursor: 'grab',
                                    border: `2px solid ${selectedPart?.id === part.id ? 'var(--accent)' : 'transparent'}`,
                                    transition: 'all 0.3s ease',
                                    boxShadow: selectedPart?.id === part.id ? '0 4px 12px rgba(201, 150, 31, 0.2)' : 'none'
                                }}
                                className="part-card"
                            >
                                <div style={{
                                    width: '100%',
                                    height: '80px',
                                    background: '#e2e8f0',
                                    borderRadius: '8px',
                                    marginBottom: '0.75rem',
                                    overflow: 'hidden'
                                }}>
                                    <img src={part.image} alt={part.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)', margin: 0 }}>{part.name}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(201, 150, 31, 0.05)', borderRadius: '16px', border: '1px dashed var(--accent)' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--accent)', margin: 0 }}>
                            <strong>Tip:</strong> You can drag these parts onto the analyzer on the right!
                        </p>
                    </div>
                </div>

                {/* Right Side: Analyzer */}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={() => setDragover(false)}
                    style={{
                        background: dragover ? 'rgba(201, 150, 31, 0.05)' : '#f8fafc',
                        borderRadius: '24px',
                        padding: '2rem',
                        border: dragover ? '2px dashed var(--accent)' : '2px solid transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: selectedPart ? 'flex-start' : 'center',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        textAlign: 'center'
                    }}
                >
                    {!selectedPart && (
                        <div style={{ opacity: 0.6 }}>
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '1rem',
                                animation: isDragging ? 'pulse 1.5s infinite' : 'none'
                            }}>🔍</div>
                            <h3>Part Analyzer</h3>
                            <p>Select a part or drop it here to see material info</p>
                        </div>
                    )}

                    {selectedPart && (
                        <div style={{ width: '100%', textAlign: 'left', animation: 'fadeIn 0.5s ease-out' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
                                <div style={{ width: '120px', height: '120px', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                                    <img src={selectedPart.image} alt={selectedPart.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <span style={{
                                        background: 'var(--accent)',
                                        color: 'white',
                                        fontSize: '0.7rem',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '50px',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>Analyzing Part...</span>
                                    <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)', margin: '0.5rem 0' }}>{selectedPart.name}</h3>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Material</p>
                                    <p style={{ fontWeight: 700, color: 'var(--primary)', margin: 0 }}>{selectedPart.material}</p>
                                </div>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Application</p>
                                    <p style={{ fontWeight: 700, color: 'var(--primary)', margin: 0 }}>{selectedPart.usage}</p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Key Features</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{selectedPart.features}</p>
                            </div>

                            <div style={{ background: 'var(--primary)', padding: '1.5rem', borderRadius: '16px', color: 'white' }}>
                                <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Technical Overview</h4>
                                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.9 }}>{selectedPart.description}</p>
                            </div>

                            <button
                                onClick={() => setSelectedPart(null)}
                                style={{
                                    marginTop: '2rem',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >Reset Analyzer</button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.6; }
                }
                .part-card:hover {
                    background: #edf2f7 !important;
                    transform: translateY(-5px);
                }
            `}</style>
        </div>
    );
}
