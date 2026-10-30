import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'data', 'database.sqlite');

let db;

const connectDB = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log(`SQLite Connected: ${dbPath}`);

        // Initialize Tables
        await db.exec(`
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL
            );

            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                category_id INTEGER,
                description TEXT,
                price REAL DEFAULT 0,
                image TEXT,
                specs TEXT,
                isMachinery BOOLEAN DEFAULT 0,
                featured BOOLEAN DEFAULT 0,
                FOREIGN KEY (category_id) REFERENCES categories(id)
            );

            CREATE TABLE IF NOT EXISTS enquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                message TEXT,
                product_id INTEGER,
                type TEXT DEFAULT 'general',
                status TEXT DEFAULT 'new',
                isRead BOOLEAN DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id)
            );

            CREATE TABLE IF NOT EXISTS admin (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
        `);

        // Seed default admin if not exists
        const admin = await db.get('SELECT * FROM admin WHERE username = ?', ['admin']);
        if (!admin) {
            // Default password: 'admin123' (In a real app, hash this)
            const bcrypt = await import('bcryptjs');
            const hashedPassword = await bcrypt.default.hash('admin123', 12);
            await db.run('INSERT INTO admin (username, password) VALUES (?, ?)', ['admin', hashedPassword]);
        }

        return db;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export { db };
export default connectDB;
