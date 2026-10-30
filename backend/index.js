import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// CORS — allow localhost + Render frontend URL
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5180',
    'http://localhost:3000',
    process.env.ALLOWED_ORIGINS,          // set this in Render dashboard
    'https://bhama-industries.onrender.com'
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        // allow requests with no origin (mobile apps, curl, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS blocked: ${origin}`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import otherRoutes from './routes/otherRoutes.js';
import wizardRoutes from './routes/wizardRoutes.js';
import aiRoutes from './routes/aiRoutes.js';


import { loginAdmin } from './controllers/adminController.js';

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/others', otherRoutes);
app.use('/api/wizard', wizardRoutes);
app.use('/api/ai', aiRoutes);


// Fallback for old login URL
app.post('/api/login', loginAdmin);

// Base route
app.get('/', (req, res) => {
    res.send('Bhama Industries API is running...');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Connect to Database and start server
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
    }
};

startServer();
