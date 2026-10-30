import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = `http://${window.location.hostname}:5000/api`;

export default function AdminDashboard() {
    const [tab, setTab] = useState("enquiries");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: "", category: "washing", description: "", specs: "", image: "" });
    const [pwdData, setPwdData] = useState({ currentPassword: "", newPassword: "" });
    const [pwdStatus, setPwdStatus] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (!token) {
            navigate("/admin/login");
            return;
        }
        fetchData();
    }, [tab]);

    const fetchData = async () => {
        setLoading(true);
        setData([]);
        try {
            const token = localStorage.getItem("admin_token");
            const endpoint = tab === "enquiries" ? "enquiries" : "products";

            if (tab === 'settings') {
                setLoading(false);
                return;
            }
            const response = await fetch(`${API_URL}/${endpoint}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();
            setData(Array.isArray(result) ? result : []);
        } catch (err) {
            console.error("Fetch error:", err);
            setData([]);
        }
        setLoading(false);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("admin_token");
            await fetch(`${API_URL}/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newProduct)
            });
            setShowModal(false);
            fetchData();
            setNewProduct({ name: "", category: "washing", description: "", specs: "", image: "" });
        } catch (err) {
            alert("Error adding product");
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPwdStatus("Updating...");
        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`${API_URL}/admin/password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(pwdData)
            });
            const result = await res.json();
            if (result.success) {
                setPwdStatus("Password updated successfully! ✅");
                setPwdData({ currentPassword: "", newPassword: "" });
            } else {
                setPwdStatus(result.message || "Update failed ❌");
            }
        } catch (err) {
            setPwdStatus("Error updating password");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
    };

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#f8fafc', overflow: 'hidden' }}>
            {/* Sidebar */}
            <div style={{ width: '280px', background: '#002b5b', color: 'white', padding: '2rem', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'white', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>Bhama Admin</h2>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>← Back to Website</p>
                </Link>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button
                        onClick={() => setTab("enquiries")}
                        style={{
                            padding: '1rem',
                            textAlign: 'left',
                            background: tab === 'enquiries' ? '#003d7e' : 'transparent',
                            border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 600,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <span>📩 Enquiries</span>
                        {data.filter(e => !e.isRead).length > 0 && tab !== 'enquiries' && (
                            <span style={{
                                background: '#ef4444',
                                color: 'white',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem'
                            }}>
                                {data.filter(e => !e.isRead).length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setTab("products")}
                        style={{
                            padding: '1rem',
                            textAlign: 'left',
                            background: tab === 'products' ? '#003d7e' : 'transparent',
                            border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 600
                        }}
                    >
                        📦 Products
                    </button>
                    <button
                        onClick={() => setTab("settings")}
                        style={{
                            padding: '1rem',
                            textAlign: 'left',
                            background: tab === 'settings' ? '#003d7e' : 'transparent',
                            border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 600
                        }}
                    >
                        ⚙️ Settings
                    </button>
                </nav>
                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: 'auto',
                        padding: '1rem',
                        width: '100%',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem 3rem',
                    background: 'white',
                    borderBottom: '1px solid #e2e8f0',
                    flexShrink: 0
                }}>
                    <h1 style={{ fontSize: '1.5rem', color: '#002b5b', margin: 0 }}>
                        {tab === 'enquiries' ? 'Client Enquiries' : tab === 'products' ? 'Manage Inventory' : 'Settings'}
                    </h1>
                    <Link to="/" style={{
                        background: '#f1f5f9',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#002b5b',
                        fontSize: '0.9rem',
                        fontWeight: 600
                    }}>
                        Visit Site ↗
                    </Link>
                </header>

                <div style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading data...</div>
                    ) : (
                        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '2.5rem' }}>
                            {tab === 'enquiries' ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                                            <th style={{ padding: '1.2rem 1rem' }}>Status</th>
                                            <th style={{ padding: '1.2rem 1rem' }}>Date</th>
                                            <th style={{ padding: '1.2rem 1rem' }}>Client</th>
                                            <th style={{ padding: '1.2rem 1rem' }}>Message</th>
                                            <th style={{ padding: '1.2rem 1rem' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(enq => (
                                            <tr key={enq._id} style={{
                                                borderBottom: '1px solid #f1f5f9',
                                                background: enq.isRead ? 'transparent' : '#f0f9ff'
                                            }}>
                                                <td style={{ padding: '1.2rem 1rem' }}>
                                                    {!enq.isRead && (
                                                        <span style={{
                                                            background: '#ef4444',
                                                            color: 'white',
                                                            padding: '2px 8px',
                                                            borderRadius: '10px',
                                                            fontSize: '0.7rem',
                                                            fontWeight: 800
                                                        }}>NEW</span>
                                                    )}
                                                </td>
                                                <td style={{ padding: '1.2rem 1rem', fontSize: '0.85rem' }}>{new Date(enq.createdAt).toLocaleDateString()}</td>
                                                <td style={{ padding: '1.2rem 1rem' }}>
                                                    <div style={{ fontWeight: 600 }}>{enq.name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{enq.email}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{enq.phone}</div>
                                                </td>
                                                <td style={{ padding: '1.2rem 1rem', color: '#475569', fontSize: '0.9rem' }}>{enq.message}</td>
                                                <td style={{ padding: '1.2rem 1rem' }}>
                                                    {!enq.isRead && (
                                                        <button
                                                            onClick={async () => {
                                                                const token = localStorage.getItem("admin_token");
                                                                await fetch(`${API_URL}/enquiries/${enq._id}/read`, {
                                                                    method: 'PUT',
                                                                    headers: { 'Authorization': `Bearer ${token}` }
                                                                });
                                                                fetchData();
                                                            }}
                                                            style={{
                                                                padding: '0.5rem 1rem',
                                                                background: '#002b5b',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer',
                                                                fontSize: '0.85rem'
                                                            }}
                                                        >
                                                            Mark Read
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {data.length === 0 && <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No enquiries found.</td></tr>}
                                    </tbody>
                                </table>
                            ) : tab === 'products' ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                                    {data.map(prod => (
                                        <div key={prod._id} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.2rem', background: '#fff' }}>
                                            <img src={prod.image} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.2rem' }} />
                                            <h4 style={{ marginBottom: '0.5rem', color: '#002b5b' }}>{prod.name}</h4>
                                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>Category: {prod.category?.name || prod.category}</p>
                                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                                                <button style={{ flex: 1, padding: '0.6rem', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                                                <button style={{ flex: 1, padding: '0.6rem', background: '#fee2e2', border: 'none', borderRadius: '8px', color: '#991b1b', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                    <div
                                        onClick={() => setShowModal(true)}
                                        style={{
                                            border: '2px dashed #cbd5e1', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '280px', gap: '1rem'
                                        }}>
                                        <span style={{ fontSize: '2.5rem', color: '#94a3b8' }}>+</span>
                                        <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 600 }}>Add New Machine</span>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ maxWidth: '450px' }}>
                                    <h3 style={{ marginBottom: '2rem', color: '#002b5b' }}>Change Admin Password</h3>
                                    {pwdStatus && <div style={{ padding: '12px', background: pwdStatus.includes('✅') ? '#f0fdf4' : '#fee2e2', color: pwdStatus.includes('✅') ? '#166534' : '#991b1b', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>{pwdStatus}</div>}
                                    <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>Current Password</label>
                                            <div style={{ position: 'relative' }}>
                                                <input type={showCurrent ? "text" : "password"} required value={pwdData.currentPassword} onChange={e => setPwdData({ ...pwdData, currentPassword: e.target.value })} style={{ width: '100%', padding: '0.9rem', borderRadius: '10px', border: '1px solid #d1d5db', paddingRight: '3rem' }} />
                                                <button type="button" onClick={() => setShowCurrent(!showCurrent)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, fontSize: '1.2rem' }}>{showCurrent ? "👁️‍🗨️" : "👁️"}</button>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>New Password</label>
                                            <div style={{ position: 'relative' }}>
                                                <input type={showNew ? "text" : "password"} required value={pwdData.newPassword} onChange={e => setPwdData({ ...pwdData, newPassword: e.target.value })} style={{ width: '100%', padding: '0.9rem', borderRadius: '10px', border: '1px solid #d1d5db', paddingRight: '3rem' }} />
                                                <button type="button" onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, fontSize: '1.2rem' }}>{showNew ? "👁️‍🗨️" : "👁️"}</button>
                                            </div>
                                        </div>
                                        <button type="submit" style={{ padding: '1rem', background: '#002b5b', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, marginTop: '1rem', transition: 'background 0.3s' }}>Update Password</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Add Product Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', width: '100%', maxWidth: '550px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}>
                        <h2 style={{ marginBottom: '2rem', color: '#002b5b' }}>Add New Machinery</h2>
                        <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Machine Name</label>
                                <input placeholder="e.g. Automatic Vial Filler" required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} style={{ padding: '0.9rem', borderRadius: '10px', border: '1px solid #d1d5db' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Category</label>
                                <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} style={{ padding: '0.9rem', borderRadius: '10px', border: '1px solid #d1d5db' }}>
                                    <option value="washing">Washing</option>
                                    <option value="filling">Filling</option>
                                    <option value="sealing">Sealing</option>
                                    <option value="labelling">Labelling</option>
                                    <option value="inspection">Inspection</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Description</label>
                                <textarea rows="3" placeholder="Key features and details..." value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} style={{ padding: '0.9rem', borderRadius: '10px', border: '1px solid #d1d5db' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Image URL</label>
                                <input placeholder="Link to machine photo" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} style={{ padding: '0.9rem', borderRadius: '10px', border: '1px solid #d1d5db' }} />
                            </div>

                            <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1.5rem' }}>
                                <button type="submit" style={{ flex: 1, padding: '1rem', background: '#002b5b', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 }}>Save Machine</button>
                                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '1rem', background: '#f1f5f9', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, color: '#475569' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
