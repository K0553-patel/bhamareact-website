import { useState } from 'react';

export default function ConnectionWizard() {
    const [sessionId, setSessionId] = useState(null);
    const [step, setStep] = useState(0);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [finalStatus, setFinalStatus] = useState(null);

    const addLog = (msg) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

    const startWizard = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/wizard/init', { method: 'POST' });
            const data = await response.json();
            setSessionId(data.sessionId);
            setStep(1);
            addLog("System setup initialized. Session ID created.");
        } catch (error) {
            addLog("ERROR: Cannot reach backend. Is the server running?");
        }
        setLoading(false);
    };

    const runStepAction = async (isFinal = false) => {
        setLoading(true);
        let actionMsg = "";
        if (step === 1) actionMsg = "Checking SQLite Database connection...";
        if (step === 2) actionMsg = "Creating tables and seeding sample machinery...";
        if (step === 3) actionMsg = "Finalizing API routes and security layers...";

        addLog(actionMsg);

        try {
            const response = await fetch('http://localhost:5000/api/wizard/next', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    stepNumber: step,
                    isFinal: isFinal,
                    stepData: { action: actionMsg }
                })
            });
            const data = await response.json();

            if (data.status === 'completed') {
                setFinalStatus(data.output);
                setStep(4);
                addLog("Backend setup completed successfully!");
            } else {
                setStep(data.nextStep);
                addLog(data.message);
            }
        } catch (error) {
            addLog("ERROR performance action: " + error.message);
        }
        setLoading(false);
    };

    return (
        <section id="wizard-setup" style={{ padding: '6rem 0', background: '#f1f5f9' }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '24px', boxShadow: 'var(--shadow-xl)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    {/* Header */}
                    <div style={{ background: 'var(--primary)', padding: '2.5rem', color: 'white', textAlign: 'center' }}>
                        <h2 style={{ color: 'white', marginBottom: '10px' }}>Bhama Backend Wizard</h2>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Follow the 'Next' actions to configure your pharmaceutical system.</p>
                    </div>

                    <div style={{ padding: '3rem' }}>
                        {step === 0 && (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                                <h3 style={{ marginBottom: '1.5rem' }}>Start System Configuration</h3>
                                <button className="btn btn-primary" onClick={startWizard} disabled={loading} style={{ padding: '1rem 3rem' }}>
                                    INITIALIZE BACKEND
                                </button>
                            </div>
                        )}

                        {step > 0 && step < 4 && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                                    {[1, 2, 3].map(s => (
                                        <div key={s} style={{ display: 'flex', alignItems: 'center', flex: s < 3 ? 1 : 0 }}>
                                            <div style={{
                                                width: '40px', height: '40px', borderRadius: '50%', background: step >= s ? 'var(--accent)' : '#e2e8f0',
                                                color: step >= s ? 'white' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                                            }}>{s}</div>
                                            {s < 3 && <div style={{ height: '2px', flex: 1, background: step > s ? 'var(--accent)' : '#e2e8f0', margin: '0 10px' }} />}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginBottom: '2rem', minHeight: '100px' }}>
                                    {step === 1 && <div><h3>Step 1: DB Connection</h3><p>Verify that the SQLite database engine is responding.</p></div>}
                                    {step === 2 && <div><h3>Step 2: Table Creation</h3><p>Initialize 'Products' and 'Enquiries' tables with sample data.</p></div>}
                                    {step === 3 && <div><h3>Step 3: API Activation</h3><p>Activate REST endpoints and JWT security middleware.</p></div>}
                                </div>

                                <div style={{ background: '#1e293b', color: '#34d399', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', height: '150px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                    {logs.map((log, i) => <div key={i}>{log}</div>)}
                                    {loading && <div style={{ color: '#fbbf24' }}>Processing...</div>}
                                </div>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => runStepAction(step === 3)}
                                    disabled={loading}
                                    style={{ width: '100%', padding: '1rem' }}
                                >
                                    {step === 3 ? "FINISH & ACTIVATE" : "NEXT STEP"}
                                </button>
                            </div>
                        )}

                        {step === 4 && (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                                <h3 style={{ color: '#059669', marginBottom: '1rem' }}>Backend Is Live!</h3>
                                <div style={{ textAlign: 'left', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <p><strong>System Status:</strong> {finalStatus?.status}</p>
                                    <p><strong>Database:</strong> Seeding Completed</p>
                                    <p><strong>Tables:</strong> Products, Enquiries, Admin, Sessions</p>
                                    <p><strong>API Port:</strong> 5000</p>
                                </div>
                                <button className="btn btn-secondary" onClick={() => setStep(0)} style={{ marginTop: '2rem' }}>
                                    RECONFIGURE
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
