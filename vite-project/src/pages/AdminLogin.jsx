import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = `http://${window.location.hostname}:5000/api`;

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${API_URL}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("admin_token", data.token);
                navigate("/admin/dashboard");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Cannot reach the server. Make sure backend is running.");
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f1f5f9'
        }}>
            <form onSubmit={handleLogin} style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-lg)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>Admin Portal</h1>

                {error && (
                    <div style={{
                        padding: '0.75rem',
                        background: '#fee2e2',
                        color: '#991b1b',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        fontSize: '0.85rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Username</label>
                    <input
                        type="text"
                        required
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    />
                </div>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', paddingRight: '2.5rem' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                opacity: 0.6
                            }}
                        >
                            {showPassword ? "👁️‍🗨️" : "👁️"}
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                    LOGIN
                </button>
            </form>
        </div>
    );
}
