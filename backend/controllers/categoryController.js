import { db } from '../config/db.js';

export const getCategories = async (req, res, next) => {
    try {
        const categories = await db.all('SELECT * FROM categories');
        res.json(categories.map(c => ({ ...c, _id: c.id })));
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const result = await db.run('INSERT INTO categories (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.lastID, name, _id: result.lastID });
    } catch (error) {
        next(error);
    }
};
