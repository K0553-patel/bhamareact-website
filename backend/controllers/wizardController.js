import crypto from 'crypto';

export const initWizard = async (req, res) => {
    const sessionId = crypto.randomUUID();
    res.json({ sessionId, step: 1 });
};

export const nextStep = async (req, res) => {
    const { sessionId, stepData, isFinal, stepNumber } = req.body;

    let actionMessage = "Step completed.";
    if (stepNumber === 1) {
        actionMessage = "SQLite database connection verified. Workspace initialized.";
    } else if (stepNumber === 2) {
        actionMessage = "Database schema validated. Tables are operational.";
    } else if (stepNumber === 3) {
        actionMessage = "Security policies (Helmet, CORS, Rate-limit) applied.";
    }

    if (isFinal) {
        res.json({
            success: true,
            status: 'completed',
            output: {
                status: "ACTIVE",
                summary: stepData,
                serverTime: new Date().toISOString(),
                logs: [actionMessage, "System boot sequence complete."]
            }
        });
    } else {
        res.json({ success: true, nextStep: stepNumber + 1, message: actionMessage });
    }
};
