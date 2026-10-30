import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../config/db.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const admin = await db.get('SELECT * FROM admin WHERE username = ?', [username]);

        if (admin && (await bcrypt.compare(password, admin.password))) {
            res.json({
                success: true,
                _id: admin.id,
                username: admin.username,
                token: generateToken(admin.id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid username or password');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
    try {
        const productCount = await db.get('SELECT COUNT(*) as count FROM products');
        const enquiryCount = await db.get('SELECT COUNT(*) as count FROM enquiries');
        const recentEnquiries = await db.all('SELECT * FROM enquiries ORDER BY createdAt DESC LIMIT 5');

        const stats = {
            totalProducts: productCount.count,
            totalEnquiries: enquiryCount.count,
            recentEnquiries: recentEnquiries.map(e => ({ ...e, _id: e.id }))
        };
        res.json(stats);
    } catch (error) {
        next(error);
    }
};

// @desc    Update admin password
// @route   PUT /api/admin/password
// @access  Private/Admin
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const adminId = req.admin.id;

        const admin = await db.get('SELECT * FROM admin WHERE id = ?', [adminId]);

        if (admin && (await bcrypt.compare(currentPassword, admin.password))) {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await db.run('UPDATE admin SET password = ? WHERE id = ?', [hashedPassword, adminId]);
            res.json({ success: true, message: 'Password updated successfully' });
        } else {
            res.status(401);
            throw new Error('Current password does not match');
        }
    } catch (error) {
        next(error);
    }
};
