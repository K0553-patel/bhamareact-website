import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Query SQL
            const admin = await db.get('SELECT id, username FROM admin WHERE id = ?', [decoded.id]);

            if (!admin) {
                return res.status(401).json({ message: 'Not authorized, admin not found' });
            }

            req.admin = admin;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
