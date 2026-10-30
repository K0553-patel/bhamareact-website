import MachineExplorer from "../components/MachineExplorer";

export default function MachinePartsPage() {
    const partCategories = [
        {
            title: "Drive Components",
            parts: ["Worm & Gears", "Timing Belts", "Chain Sprockets", "Industrial Bearings"],
            image: "https://images.unsplash.com/photo-1540104443314-12403666fe5b?auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Liquid Handling",
            parts: ["Filling Nozzles", "Piston Pumps", "Dosing Syringes", "Silicone Tubes"],
            image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Packaging Format Parts",
            parts: ["Star Wheels", "Center Guides", "Capping Chucks", "Scrolls & Worms"],
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Sealing Components",
            parts: ["Sealing Rollers", "Heating Elements", "Gaskets & O-Rings", "Cap Chucks"],
            image: "https://images.unsplash.com/photo-1504194104404-433180773017?auto=format&fit=crop&w=600&q=80"
        }
    ];

    return (
        <div className="machine-parts-page">
            <section style={{
                background: 'var(--primary)',
                color: 'white',
                padding: '8rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>All Machine Parts</h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '700px', marginInline: 'auto', opacity: 0.9 }}>
                        Our precision engineering division manufactures high-quality spare parts and format components
                        compatible with all major pharmaceutical machinery brands.
                    </p>
                </div>
            </section>

            <section style={{ padding: '4rem 0', background: 'white' }}>
                <div className="container">
                    <MachineExplorer />
                </div>
            </section>

            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Precision Component Division</h2>
                        <div style={{ width: '60px', height: '4px', background: 'var(--accent)', margin: '1rem auto' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem' }}>
                        {partCategories.map((cat, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                background: 'white',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow)',
                                border: '1px solid #f1f5f9'
                            }}>
                                <div style={{ width: '40%', height: '300px' }}>
                                    <img src={cat.image} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ width: '60%', padding: '2rem' }}>
                                    <h3 style={{ color: 'var(--primary)', marginBottom: '1.25rem', fontSize: '1.4rem' }}>{cat.title}</h3>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {cat.parts.map(part => (
                                            <li key={part} style={{
                                                marginBottom: '0.75rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                color: 'var(--text-muted)'
                                            }}>
                                                <span style={{ color: 'var(--accent)', fontWeight: 800 }}>•</span> {part}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="btn btn-outline" style={{ marginTop: '1.5rem', padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Check Stock</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ background: '#f8fafc', padding: '6rem 0' }}>
                <div className="container">
                    <div style={{
                        background: 'white',
                        padding: '4rem',
                        borderRadius: '24px',
                        boxShadow: 'var(--shadow)',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '4rem',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h2 style={{ textAlign: 'left', marginBottom: '2rem' }}>Custom Format Parts</h2>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
                                We specialize in manufacturing custom format parts (Change Parts) for your existing machinery.
                                Provide us with your bottle and cap samples, and we will engineer precision components
                                to ensure smooth changeovers and high-speed efficiency.
                            </p>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <div>
                                    <h4 style={{ color: 'var(--primary)', margin: 0 }}>24h Quote</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Fast turnaround on RFQs</p>
                                </div>
                                <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '2rem' }}>
                                    <h4 style={{ color: 'var(--primary)', margin: 0 }}>Global Shipping</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Express delivery worldwide</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontWeight: 700, marginBottom: '1rem' }}>Upload your machine specs for a quick quote</p>
                            <button className="btn btn-primary" style={{ padding: '1rem 3rem' }}>REQUEST SPARE PARTS QUOTE</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
