import { db } from '../config/db.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
    try {
        const { category, search } = req.query;
        let sql = `
            SELECT p.*, c.name as categoryName 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
        `;
        let params = [];
        let conditions = [];

        if (category) {
            conditions.push("c.name = ?");
            params.push(category);
        }

        if (conditions.length > 0) {
            sql += " WHERE " + conditions.join(" AND ");
        }

        const products = await db.all(sql, params);

        // Match the expected response format (mapping category_id/categoryName back to what frontend expects)
        const formattedProducts = products.map(p => ({
            ...p,
            category: { name: p.categoryName, _id: p.category_id },
            _id: p.id // Frontend uses _id from mongo days
        }));

        res.json(formattedProducts);
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
    try {
        const product = await db.get(`
            SELECT p.*, c.name as categoryName 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.id = ?
        `, [req.params.id]);

        if (product) {
            res.json({
                ...product,
                category: { name: product.categoryName, _id: product.category_id },
                _id: product.id
            });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
    try {
        let { name, category, description, price, image, specs, isMachinery, featured } = req.body;

        // Find category ID by name
        let category_id;
        const categoryData = await db.get('SELECT id FROM categories WHERE name = ?', [category]);

        if (categoryData) {
            category_id = categoryData.id;
        } else {
            // If category doesn't exist, create it (or handle error)
            const newCat = await db.run('INSERT INTO categories (name) VALUES (?)', [category]);
            category_id = newCat.lastID;
        }

        const result = await db.run(
            'INSERT INTO products (name, category_id, description, price, image, specs, isMachinery, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, category_id, description, price || 0, image, typeof specs === 'string' ? specs : JSON.stringify(specs || {}), isMachinery ? 1 : 0, featured ? 1 : 0]
        );

        res.status(201).json({ id: result.lastID, name, success: true });
    } catch (error) {
        next(error);
    }
};
