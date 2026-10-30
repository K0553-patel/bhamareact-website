import { db } from '../config/db.js';

// @desc    Submit an enquiry
// @route   POST /api/enquiries
// @access  Public
export const submitEnquiry = async (req, res, next) => {
    try {
        const { name, email, phone, message, product, type } = req.body;
        
        // Handle optional product object and provide fallbacks for missing fields
        const productId = (product && typeof product === 'object') ? product._id : (product || null);
        const phoneNumber = phone || 'Not Provided';
        const inquiryType = type || 'general';

        const result = await db.run(
            'INSERT INTO enquiries (name, email, phone, message, product_id, type) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, phoneNumber, message, productId, inquiryType]
        );

        res.status(201).json({
            success: true,
            message: "Enquiry received! Our team will contact you shortly.",
            id: result.lastID
        });
    } catch (error) {
        console.error('Enquiry Submission Error:', error);
        next(error);
    }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
export const getEnquiries = async (req, res, next) => {
    try {
        const enquiries = await db.all(`
            SELECT e.*, p.name as productName 
            FROM enquiries e 
            LEFT JOIN products p ON e.product_id = p.id 
            ORDER BY e.createdAt DESC
        `);

        const formattedEnquiries = enquiries.map(e => ({
            ...e,
            _id: e.id,
            product: e.product_id ? { name: e.productName, _id: e.product_id } : null
        }));

        res.json(formattedEnquiries);
    } catch (error) {
        next(error);
    }
};

// @desc    Mark enquiry as read
// @route   PUT /api/enquiries/:id/read
// @access  Private/Admin
export const markAsRead = async (req, res, next) => {
    try {
        const result = await db.run('UPDATE enquiries SET isRead = 1 WHERE id = ?', [req.params.id]);

        if (result.changes > 0) {
            res.json({ success: true, message: 'Enquiry marked as read' });
        } else {
            res.status(404);
            throw new Error('Enquiry not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
export const deleteEnquiry = async (req, res, next) => {
    try {
        const result = await db.run('DELETE FROM enquiries WHERE id = ?', [req.params.id]);

        if (result.changes > 0) {
            res.json({ success: true, message: 'Enquiry deleted' });
        } else {
            res.status(404);
            throw new Error('Enquiry not found');
        }
    } catch (error) {
        next(error);
    }
};


