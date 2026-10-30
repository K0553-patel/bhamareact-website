import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        type: "New Machinery Quote",
        message: ""
    });
    const [status, setStatus] = useState({ type: "", msg: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "loading", msg: "Sending enquiry..." });

        try {
            const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api/enquiries";
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setStatus({ type: "success", msg: data.message || "Enquiry sent successfully!" });
                setFormData({ name: "", email: "", phone: "", type: "New Machinery Quote", message: "" });
            } else {
                setStatus({ type: "error", msg: data.message || "Failed to send enquiry" });
            }
        } catch (error) {
            console.error('Contact Form Error:', error);
            setStatus({ type: "error", msg: "Connection error. Please ensure the backend server is running." });
        }
    };

    return (
        <div className="contact-page">
            <section style={{ background: 'var(--primary)', color: 'white', padding: '6rem 0' }}>
                <div className="container text-center">
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get in Touch</h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                        Connect with Bhama Industries for world-class pharma engineering solutions.
                    </p>
                </div>
            </section>

            <section className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '4rem'
                }}>
                    <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
                        <h2 style={{ textAlign: 'left', fontSize: '1.8rem', marginBottom: '2rem' }}>Send a Message</h2>

                        {status.msg && (
                            <div style={{
                                padding: '1rem',
                                marginBottom: '1.5rem',
                                borderRadius: '8px',
                                background: status.type === 'error' ? '#fee2e2' : '#f0fdf4',
                                color: status.type === 'error' ? '#991b1b' : '#166534',
                                fontSize: '0.9rem',
                                fontWeight: 700
                            }}>
                                {status.msg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        outlineColor: 'var(--accent)'
                                    }} placeholder="Enter your name" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            borderRadius: '8px',
                                            border: '1px solid #e2e8f0',
                                            outlineColor: 'var(--accent)'
                                        }} placeholder="email@company.com" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            borderRadius: '8px',
                                            border: '1px solid #e2e8f0',
                                            outlineColor: 'var(--accent)'
                                        }} placeholder="+91 00000 00000" />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Inquiry Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0'
                                    }}>
                                    <option>New Machinery Quote</option>
                                    <option>Technical Support</option>
                                    <option>Spare Parts</option>
                                    <option>General Inquiry</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Message</label>
                                <textarea
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        outlineColor: 'var(--accent)'
                                    }} placeholder="Tell us about your requirements..."></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status.type === 'loading'}
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '1rem', opacity: status.type === 'loading' ? 0.7 : 1 }}
                            >
                                {status.type === 'loading' ? 'Sending...' : 'Send Inquiry'}
                            </button>
                        </form>
                    </div>

                    <div>
                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Registered Address</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                90, Shahitay Industrial Hub,<br />
                                Bakrol-Bujrang,<br />
                                Ahmedabad - 382430, India
                            </p>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Office Address</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                Shed No 156, Abhishree Industrial Park,<br />
                                B/h Grand Vishala, Nr. S.P. Ringroad,<br />
                                Odhav, Ahmedabad - 382415
                            </p>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Contact Info</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                <strong>WhatsApp/Call:</strong> +91 95584 83100<br />
                                <strong>Support Email:</strong> bhamasind@gmail.com
                            </p>
                        </div>

                        <div style={{
                            background: 'var(--secondary)',
                            color: 'white',
                            padding: '2rem',
                            borderRadius: '12px'
                        }}>
                            <h4 style={{ color: 'var(--accent-light)', marginBottom: '0.5rem' }}>Compliance</h4>
                            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                Our machines and processes are strictly compliant with global GMP and industrial standards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
